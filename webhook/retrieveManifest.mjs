import path from 'path'

const retrieveManifest = (store, mkey, willClone = true) => {
  try {
    return store.downloadFile(path.join(mkey, 'manifest.json')).then(async (source) => {
      if (source.NoSuchKey) {
        if (willClone) {
          console.log({ NoSuchKey: `cloning main into ${mkey}` })
          return retrieveManifest(store, 'main')
        } else {
          throw source
        }
      }
      return JSON.parse(source)
    })
  } catch (err) {
    console.log({ error: err })
  }
}

export default retrieveManifest
