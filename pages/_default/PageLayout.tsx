import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BcFooter } from '@2k-web/bc-footer-react'
import footerContent from '../../src/shared.content'
import { BeaconTheme, BeaconThemeGlobalStyle } from '../../src/theme'

export { PageLayout }

type Children = React.ReactNode

function PageLayout({ children }: { children: Children }) {
  return (
    <React.StrictMode>
      <ThemeProvider theme={BeaconTheme}>
        <BeaconThemeGlobalStyle />
        {children}
        <BcFooter {...footerContent.footerData} />
      </ThemeProvider>
    </React.StrictMode>
  )
}
