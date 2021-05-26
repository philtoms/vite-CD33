import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BcFooter } from "@2k-web/bc-footer-react";

import { Home } from "./pages/Home/Home";
import { BeaconTheme, BeaconThemeGlobalStyle } from "./theme";
import { ThemeProvider } from "styled-components";
import { getContentFromContentful } from "./contentfulLibrary";
import { IPage, IPageHome } from "../@types/generated/contentful";
import { footerDto } from "./dtos/footer.dto";

function App() {
  const [homePageData, setHomePageData] =
    React.useState<IPageHome | null>(null);
  React.useEffect(() => {
    (async () => {
      const homePageData = await getContentFromContentful<IPage>(
        "3Rdu0CSE4LRCVskZKXUJhR"
      );

      setHomePageData(homePageData.fields.content);
    })();
  }, []);

  if (!homePageData) return null;

  return (
    <ThemeProvider theme={BeaconTheme}>
      <BeaconThemeGlobalStyle />
      <Router>
        <Switch>
          <Route path="/">
            <Home homePageData={homePageData} />
          </Route>
        </Switch>
        <BcFooter {...footerDto(homePageData?.fields.footer)} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
