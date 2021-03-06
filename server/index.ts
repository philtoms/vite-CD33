import express from 'express'
import { createPageRender, html } from 'vite-plugin-ssr'
import * as vite from 'vite'

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

const mode = process.env.APP_MODE || 'SSR'
console.log(`running as ${mode} server`)

startServer()

async function startServer() {
  const app = express()

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`, { index: false }))
  } else {
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true }
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRender({ viteDevServer, isProduction, root })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const contextProps = { html }
    const result = await renderPage({ url, contextProps })
    if (result.nothingRendered) return next()

    // const html =
    //   mode === 'HTML' ? (result.renderResult as string).replace(/<script(.*?)<\/script>/g, '') : result.renderResult

    res.status(result.statusCode).send(result.renderResult)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
