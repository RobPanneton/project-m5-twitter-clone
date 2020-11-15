import React from "react";
import styled from "styled-components";
import Feed from "./Feed";
import HomeTweetBox from "./HomeTweetBox";

const HomeFeed = () => {
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
