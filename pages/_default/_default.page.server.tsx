import ReactDOMServer from 'react-dom/server'
import React from 'react'

import { StaticRouter } from 'react-router-dom'

import { PageLayout } from './PageLayout'
// import { html } from "vite-plugin-ssr";
import { ContextProps, ReactComponent } from './types'
import logoUrl from './logo.svg'

export { render }
export { passToClient }

// See https://github.com/brillout/vite-plugin-ssr#data-fetching
const passToClient = ['pageProps']

import { ServerStyleSheet } from 'styled-components'

function render({ Page, contextProps }: { Page: ReactComponent; contextProps: ContextProps }) {
  const context = {}
  const sheet = new ServerStyleSheet()
  const pageHtml = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <PageLayout>
        <StaticRouter context={context}>
          <Page {...contextProps.pageProps} />
        </StaticRouter>
      </PageLayout>
    )
  )
  const styleTags = sheet.getStyleTags()
  sheet.seal()

  const title = 'My Vite SSR app'
  const description = 'A Vite SSR app'
  return contextProps.html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
        ${contextProps.html.dangerouslySetHtml(styleTags)}
      </head>
      <body>
        <div id="page-view">${contextProps.html.dangerouslySetHtml(pageHtml)}</div>
      </body>
    </html>`
}
