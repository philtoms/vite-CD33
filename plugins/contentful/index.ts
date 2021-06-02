import { Plugin } from 'vite'
import { getContentFromContentful } from './contentfulLibrary'
import { sanitize } from './sanitizeContentful'
import { basename } from 'path'
type RunCache = Record<string, Promise<string>>

const runCache: RunCache = {}

// if set, return 'live' publish or preview data
const mode = process.env.CONTENTFUL_MODE || ''

if (mode) {
  console.log(`running in live Contentful ${mode} mode`)
}
export default function plugin(): Plugin {
  return {
    name: 'contentful',
    load(id: string) {
      if (mode && id.includes('.content.')) {
        // convention: take the first path segment as the Contentful entryId
        // eg: pageData.content.ts => 'pageData'
        const name = basename(id).split('.').shift() || ''
        console.log({ name })
        return getContentFromContentful(name, mode === 'publish').then((content) => {
          console.log(JSON.stringify(sanitize(content), null, 2))
          return `export default ${JSON.stringify(sanitize(content))}`
        })
      }
    }
  }
}
