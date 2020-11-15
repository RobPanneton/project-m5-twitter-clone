import React, { useContext } from "react";
import styled from "styled-components";
import Feed from "./Feed";
import HomeTweetBox from "./HomeTweetBox";
import { CurrentUserContext } from "../CurrentUserContext";
import ErrorPage from "./ErrorPage";

const HomeFeed = () => {
  const { status } = useContext(CurrentUserContext);

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <HomeWrapper>
      <HomeText>
        <Text>Home</Text>
      </HomeText>
      <HomeTweetBox />
      <Feed />
    </HomeWrapper>
  );
};

export default HomeFeed;

const HomeText = styled.div`
  border-bottom: 1px solid lightgray;
`;

const Text = styled.h1`
  padding: 10px;
  font-size: 24px;
`;

const HomeWrapper = styled.div``;
