import fs from 'fs-extra'
import path from 'path'
import s3 from './s3.mjs'

export default (root, mkey) => {
  const Manifest = async (node) => {
    const manifestPath = path.join(root, mkey, node, 'manifest.json')
    let manifest = fs.pathExistsSync(manifestPath) && fs.readJsonSync(manifestPath)
    if (!manifest) {
      const manifestKey = path.join(mkey, node, 'manifest.json')
      manifest = await s3.downloadFile(manifestKey)
      fs.writeJsonSync(manifestPath, manifest)
    }
    const realign = (newManifest) => {
      manifest = Object.entries(newManifest).reduce((acc, [key, value]) => {
        if (key in acc) {
          acc[key] = value
          return acc
        }
        return {
          ...acc,
          [key]: value
        }
      }, manifest)
      return manifest
    }

    return {
      node,
      manifest,
      realign
    }
  }

  const createDistributionPatch = (manifest) => {
    return Object.values(manifest).filter(({ file }) => !fs.pathExistsSync(path.join(root, mkey, file)))
  }

  const applyDistributionPatch = async (patch) => {
    const files = patch.map(({ file, specifier }) => {
      return s3.downloadFile(specifier).then((source) => ({ file, source }))
    })

    const filePath = path.join(root, mkey, 'dist')
    const patches = await Promise.all(files)

    patches.forEach(({ file, source }) => fs.outputFileSync(path.join(filePath, file), source))
  }

  const patch = async (target) => {
    const { node, manifest } = await target
    const { realign } = await Manifest(node)

    const aligned = realign(manifest)
    const patch = createDistributionPatch(aligned)
    if (patch.length > 0) {
      await applyDistributionPatch(patch)
      const manifestKey = path.join(mkey, node, 'manifest.json')
      s3.uploadFile(manifestKey, aligned)
    }
    return patch.length
  }

  return { Manifest, createDistributionPatch, applyDistributionPatch, patch }
}
