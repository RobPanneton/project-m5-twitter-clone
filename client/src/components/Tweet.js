import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CurrentUserContext, CurrentUserProvider } from "../CurrentUserContext";
import ActionBar from "./ActionBar.js";
import moment from "moment";

const Tweet = ({ tweet, feedLoadStatus }) => {
  const tweetTimeStamp = moment(tweet.timestamp).format("MMM Do");

  return (
    <Wrapper>
      {feedLoadStatus === "loaded" && (
        <>
          <TweetWrapper>
            <ProfilePicture
              src={tweet.author.avatarSrc}
              alt={`${tweet.handle}'s profile photo`}
            />
            <RestOfTweetWrap>
              <UserInfo>
                <TweeterInfo>
                  <DisplayName>{tweet.author.displayName}</DisplayName>
                  <Handle>
                    @{tweet.author.handle} ● {tweetTimeStamp}
                  </Handle>
                </TweeterInfo>
              </UserInfo>
              <TweetContent>
                <Status>{tweet.status}</Status>

                {tweet.media[0]?.url && (
                  <TweetPicture
                    src={tweet.media[0].url}
                    alt={`tweet picture`}
                  />
                )}
              </TweetContent>

              <ActionBar tweet={tweet} />
            </RestOfTweetWrap>
          </TweetWrapper>
        </>
      )}
      <Divider></Divider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px 20px;
`;

const TweetWrapper = styled.div`
  display: flex;
  padding: 8px 0;
`;

const RestOfTweetWrap = styled.div`
  width: 100%;
  margin-left: 16px;
  line-height: 1.5;
`;

const UserInfo = styled.div`
  display: flex;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

const TweetContent = styled.div`
  width: 100%;
`;

const TweeterInfo = styled.div`
  display: flex;
`;

const DisplayName = styled.h1``;

const Handle = styled.span`
  margin-left: 12px;
  color: gray;
`;

const Status = styled.p`
  margin-bottom: 6px;
`;

const TweetPicture = styled.img`
  max-width: 100%;
  border-radius: 20px;
`;

const Divider = styled.div`
  height: 2px;
  background-color: lightgray;
`;

export default Tweet;
