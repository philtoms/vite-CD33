import express from 'express'
import path from 'path'
import crc from 'node-crc'
import { getContentFromContentful } from './contentfulLibrary.mjs'
import S3 from './S3Content.mjs'
import retrieveManifest from './retrieveManifest.mjs'

const app = express()
app.use(express.json())
app.post('*', async (req) => {
  const name = req.headers['x-contentful-webhook-name']
  const topic = req.headers['x-contentful-topic']

  const content = await getContentFromContentful(name, true)
  console.log(content.fields)

  const mkey = content.fields.mkey || (topic === 'ContentManagement.Entry.publish' ? 'production' : 'preview')

  console.log({ name, mkey, topic })

  const store = S3()

  const manifest = await retrieveManifest(store, mkey)

  const item = Object.values(manifest).find(
    ({ specifier }) => specifier.includes('.content.') && specifier.includes(name)
  )
  const serverContent = `module.exports = {default:${JSON.stringify(content)}}`
  // const clientContent = `export default ${JSON.stringify(content)}`

  const hash = crc.crc32(Buffer.from(serverContent, 'utf8')).toString('hex')
  const specifier = item.specifier.split('.js.')[0]
  item.specifier = `${specifier}.js.${hash}`

  console.log({ [mkey]: manifest })

  store.uploadFile(JSON.stringify(manifest), path.join(mkey, 'manifest.json')).then((log) => {
    console.log(log)
  })

  store.uploadFile(serverContent, item.specifier).then((log) => {
    console.log(log)
  })
})

const port = 4567
app.listen(port)
console.log(`Server running at http://localhost:${port}`)
