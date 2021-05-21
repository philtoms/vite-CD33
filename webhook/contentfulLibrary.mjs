import contentful from 'contentful'
import cookies from 'js-cookie'
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
export const getContentFromContentful = (entryId, isPreview) => {
  if (!entryId) throw new Error('You need to provide entryId.')
  isPreview = isPreview || cookies.get('contentType') === 'preview'

  const environment = isPreview ? PREVIEW_ENV : CDN_ENV
  const space = isPreview ? PREVIEW_SPACE : CDN_SPACE
  const accessToken = isPreview ? PREVIEW_ACCESS_TOKEN : CDN_ACCESS_TOKEN

  console.log({ environment, space, accessToken: '****' })
  if (isPreview) console.log(`Getting Contentful data using Preview keys from "${environment}" environment`)
  else console.log(`Getting Contentful data using Live CDN keys from "${environment}" environment`)

  const client = createClient({
    environment,
    space,
    accessToken,
    host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com'
  })

  return client.getEntry(entryId, { include: 2 }).catch((e) => {
    console.log(e)
    return { fields: null }
  })
}
