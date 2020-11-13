import React from "react";
import styled from "styled-components";
import Feed from "./Feed";

const HomeFeed = () => {
  return (
    <HomeWrapper>
      <PostTweetDiv>form here</PostTweetDiv>
      <Feed />
    </HomeWrapper>
  );
};

export default HomeFeed;

const PostTweetDiv = styled.div``;

const HomeWrapper = styled.div``;
