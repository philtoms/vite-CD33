import path from 'path'
import crc from 'node-crc'
import { getContentFromContentful } from './contentfulLibrary.mjs'
import S3 from './S3Content.mjs'
import retrieveManifest from './retrieveManifest.mjs'
import sanitize from './sanitize.mjs'

const updateStore = async (name, isPublish) => {
  const mkey = isPublish ? 'production' : 'preview'

  console.log({ isPublish, name, mkey })

  const content = sanitize(await getContentFromContentful(name, isPublish))
  if (!content || content.fields === null) {
    if (isPublish) {
      console.warn({ warning: `${name} is not published - aborting update` })
    } else {
      console.error({ error: `${name} not found - aborting update` })
    }
    return
  }
  contentSource = JSON.stringify(content)
  console.log({ content: contentSource })

  const store = S3()

  const manifest = await retrieveManifest(store, mkey)
  const newManifest = { ...manifest }

  for (let item of Object.entries(manifest).filter(
    ([, { specifier }]) => specifier.includes('.content.') && specifier.includes(name)
  )) {
    const [key, value] = item
    // todo: update client content
    let source = /*item.specifier.includes('server') ?*/ `export default ${contentSource}`
    /*:`module.exports = {default:${contentSource}}`*/

    const hash = crc.crc32(Buffer.from(source, 'utf8')).toString('hex')
    if (value.specifier.includes(hash)) {
      console.info({ info: `${value.specifier} already stored - debouncing` })
      continue
    }

    const specifier = `${value.specifier.split('.js.')[0]}.js.${hash}`
    newManifest[key] = {
      file: value.file,
      specifier
    }

    store.uploadFile(source, specifier).then((log) => {
      console.log(log)
    })
  }

  console.log({ [mkey]: newManifest })

  const hash1 = crc.crc32(Buffer.from(JSON.stringify(manifest), 'utf8'))
  const hash2 = crc.crc32(Buffer.from(JSON.stringify(newManifest), 'utf8'))
  if (hash1 === hash2) {
    console.info({ info: `Manifest already published - debouncing` })
    return
  }

  if (isPublish) {
    const timestamp = new Date().toISOString()
    const manifestSource = JSON.stringify(manifest)
    const manifestKey = `${mkey}.${timestamp}.json`
    store.uploadFile(manifestSource, manifestKey).then((log) => {
      console.log(log)
    })
  }

  store.uploadFile(JSON.stringify(newManifest), path.join(mkey, 'manifest.json')).then((log) => {
    console.log(log)
  })
}

export default updateStore
