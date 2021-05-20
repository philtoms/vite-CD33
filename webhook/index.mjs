import express from 'express'
import simpleGit from 'simple-git'
import path from 'path'
import { getContentFromContentful } from './contentfulLibrary.mjs'
import S3 from './S3Content.mjs'

const options = {
  baseDir: process.cwd(),
  binary: 'git'
}

const git = simpleGit(options)

const app = express()
app.use(express.json())
app.post('*', async (req) => {
  const name = req.headers['x-contentful-webhook-name']
  const content = await getContentFromContentful(name, true)

  const status = await git.status()
  const { current } = status

  const s3 = S3()

  const mkey = content.fields.mkey || current
  const manifest = await s3.downloadFile(path.join(mkey, 'manifest.json')).then((source) => {
    return JSON.parse(source)
  })

  const item = Object.values(manifest).find(
    ({ specifier }) => specifier.includes('.content.') && specifier.includes(name)
  )
  console.log(content.fields)
  const serverContent = `module.exports = {default:${JSON.stringify(content)}}`
  // const clientContent = `export default ${JSON.stringify(content)}`

  const contentKey = item.specifier.replace('{mkey}', mkey)
  s3.uploadFile(serverContent, contentKey).then((log) => {
    console.log(log)
  })
})

const port = 4567
app.listen(port)
console.log(`Server running at http://localhost:${port}`)
