import express from 'express'
import updateStore from './updateStore.mjs'

const app = express()
app.use(express.json())
app.post('*', async (req) => {
  const name = req.headers['x-contentful-webhook-name']
  const topic = req.headers['x-contentful-topic']
  const isPublish = topic === 'ContentManagement.Entry.publish'

  updateStore(name, isPublish)
})

const port = 4567
app.listen(port)
console.log(`Server running at http://localhost:${port}`)
