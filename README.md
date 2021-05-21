# vite-CD3³

## Dev mode (SPA, esm imports, HMR)

`yarn dev`

Auto refresh of code and co-located content

```
// page.content.ts
export default {
  content...
}

// page.ts
import content from 'page.content'
```

## Prod mode (SSR, chuncks, minified)

`yarn prod`

## Build:cd33 mode (push content to S3)

Builds locally, or in github push action.

```
  APP_MODE = SSR (default) | SSG | HTML
  BUILD = CD33
```

(note: SSG is emulated by SSR minus client build. True SSG will be available with `vite-plugin-ssr prerender` but requires content retrieval hook)

Stores assets in S3

```
APP_MODE
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
S3_REGION
S3_BUCKET

CONTENTFUL_SPACE_ID
CONTENTFUL_ENVIRONMENT_ID = master
PREVIEW_ACCESS_TOKEN
```

`yarn build:cd33`

## Webhook mode

Runs a simple JSON server listening on port `4567` (configured for ngrok).
accepts content with header `x-contentful-webhook-name` and payload content

```
{
  fields: {
    mkey: string,
    ...
  }
}
```

Retrieves content with `entryId=x-contentful-webhook-name`
Retrieves manifest with `key=mkey`
stores S3 content at `bucketname/mkey/server/assets/page.content.js`

```
CONTENTFUL_SPACE_ID
CONTENTFUL_ENVIRONMENT_ID = master
PREVIEW_ACCESS_TOKEN

S3_REGION = us-east-1
S3_BUCKET = skk-philtoms
```

`yarn webhook`
