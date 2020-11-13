import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import Profile from "./components/Profile";
import Tweet from "./components/Tweet";

function App() {
  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <Router>
          <Sidebar />
          <ContentWrapper>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/notifications" component={Notifications}></Route>
              <Route path="/bookmarks" component={Bookmarks}></Route>
              <Route path="/tweet/:tweetId" component={TweetDetails}></Route>
              <Route path="/:profileId" component={Profile}></Route>
            </Switch>
          </ContentWrapper>
        </Router>
      </AppWrapper>
    </>
  );
}
export default App;

const AppWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  margin-left: 200px;
`;
