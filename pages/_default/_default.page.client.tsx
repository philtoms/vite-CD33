import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { getPage } from 'vite-plugin-ssr/client'
import { PageLayout } from './PageLayout'

hydrate()

async function hydrate() {
  const { Page, contextProps } = await getPage()

  ReactDOM.hydrate(
    <PageLayout>
      <Router>
        <Switch>
          <Route path="/">
            <Page {...contextProps.pageProps} />
          </Route>
        </Switch>
      </Router>
    </PageLayout>,
    document.getElementById('page-view')
  )
}
