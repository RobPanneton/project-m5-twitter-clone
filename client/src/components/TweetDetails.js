import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import ActionBar from "./ActionBar.js";
import moment from "moment";
import ErrorPage from "./ErrorPage";

const TweetDetails = () => {
  const [tweet, setTweet] = useState();
  const [loadStatus, setLoadStatus] = useState("loading");
  const { tweetId } = useParams();
  const { currentUser, status, setStatus } = useContext(CurrentUserContext);

  useEffect(() => {
    const ac = new AbortController();

    if (tweetId) {
      fetch(`/api/tweet/${tweetId}`)
        .then((res) => res.json())
        .then((data) => {
          setTweet(data.tweet);
        })
        .then(() => setLoadStatus("loaded"))
        .catch((err) => setStatus("error"));
    } else {
      return;
    }

    return () => {
      ac.abort();
    };
  }, []);

  const tweetTimeStamp = moment(tweet?.timestamp).format(
    "hh:mm A [●] MMM D YYYY"
  );

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <Wrapper tabIndex={0}>
      {loadStatus === "loaded" && (
        <TweetWrapper>
          <UserInfo>
            <ProfilePicture
              src={tweet.author.avatarSrc}
              alt={`${tweet.handle}'s profile photo`}
            />
            <TweeterInfo>
              <DisplayName tabIndex={0}>{tweet.author.displayName}</DisplayName>
              <Handle>@{tweet.author.handle}</Handle>
            </TweeterInfo>
          </UserInfo>
          <TweetContent>
            <Status>{tweet.status}</Status>
            {tweet.media[0]?.url && (
              <TweetPicture src={tweet.media[0]?.url} alt={`tweet picture`} />
            )}
          </TweetContent>
          <TimePosted> {tweetTimeStamp} ● critter web app</TimePosted>

          <ActionBar />
        </TweetWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px;
`;

const TweetWrapper = styled.div``;

const UserInfo = styled.div`
  display: flex;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

const TweetContent = styled.div``;

const TweeterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
`;

const DisplayName = styled.h1``;

const Handle = styled.span``;

const TimePosted = styled.span`
  color: gray;
`;

const Status = styled.p``;

const TweetPicture = styled.img`
  max-width: 100%;
  border-radius: 20px;
`;

export default TweetDetails;
