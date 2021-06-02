import express from 'express'
import { fetchLiveVersions, fetchKeyedVersion, insertNewVersion } from './dynamoDB'
import updateDistro from './updateDistro'

const root = process.cwd()

const app = express()

app.use(express.json())
app.get('*', async (req) => {
  const list = await fetchLiveVersions()
  req.status(200).send(JSON.stringify(list))
})

app.post('*', async (req) => {
  const mkey = req.headers['x-cd3-mkey']
  const codeVersion = req.headers['x-cd3-code-version']
  const contentVersion = req.headers['x-cd3-content-version']

  await updateDistro(root, mkey, codeVersion)
  await updateDistro(root, mkey, contentVersion)

  const alreadyExists = await fetchKeyedVersion(mkey)
  if (!alreadyExists) {
    await insertNewVersion(mkey, codeVersion, contentVersion)
  }

  return req.status(201).send(`${mkey} versioned at ${codeVersion}:${contentVersion}`)
})

const port = 4567
app.listen(port)
console.log(`Server running at http://localhost:${port}`)
