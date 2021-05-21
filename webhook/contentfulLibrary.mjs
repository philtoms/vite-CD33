import contentful from 'contentful'
import dotenv from 'dotenv'

dotenv.config()

const { createClient } = contentful

const PREVIEW_ENV = process.env.CONTENTFUL_ENVIRONMENT || 'master'
const PREVIEW_SPACE = process.env.CONTENTFUL_SPACE_ID
const PREVIEW_ACCESS_TOKEN = process.env.PREVIEW_ACCESS_TOKEN

const CDN_ENV = process.env.CONTENTFUL_ENVIRONMENT || 'master'
const CDN_SPACE = process.env.CONTENTFUL_SPACE_ID
const CDN_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN

// Called from clientside
export const getContentFromContentful = (entryId, isPublish) => {
  if (!entryId) throw new Error('You need to provide entryId.')

  const environment = isPublish ? CDN_ENV : PREVIEW_ENV
  const space = isPublish ? CDN_SPACE : PREVIEW_SPACE
  const accessToken = isPublish ? CDN_ACCESS_TOKEN : PREVIEW_ACCESS_TOKEN
  const host = isPublish ? 'cdn.contentful.com' : 'preview.contentful.com'

  console.log({ host, environment, space, accessToken: '****' })

  const client = createClient({
    environment,
    space,
    accessToken,
    host
  })

  return client.getEntry(entryId, { include: 2 }).catch((e) => {
    console.log(e)
    return { fields: null }
  })
}
