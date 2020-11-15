import React from "react";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import styled from "styled-components";
import Icon from "react-icons-kit";

const ErrorPage = () => {
  return (
    <Wrapper>
      <Icon icon={bomb} size={50} />
      <Error>An unknown error has occured.</Error>
      <Contact>
        Please try refreshing the page, or{" "}
        <Underline>contact support</Underline> if the problem persists.
      </Contact>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Error = styled.h1`
  font-weight: 700;
  margin-top: 24px;
`;

const Contact = styled.span``;

const Underline = styled.span`
  color: blue;
  text-decoration: underline;
`;

export default ErrorPage;
