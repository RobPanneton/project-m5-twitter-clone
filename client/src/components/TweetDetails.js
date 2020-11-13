import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import ActionBar from "./ActionBar.js";
const TweetDetails = () => {
  const [tweet, setTweet] = useState();
  const [loadStatus, setLoadStatus] = useState("loading");
  const { tweetId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const ac = new AbortController();

    if (tweetId) {
      fetch(`/api/tweet/${tweetId}`)
        .then((res) => res.json())
        .then((data) => {
          setTweet(data.tweet);
          console.log(data);
        })
        .then(() => setLoadStatus("loaded"));
    } else {
      return;
    }

    return () => {
      ac.abort();
    };
  }, []);

  console.log(tweet);

  return (
    <Wrapper>
      {loadStatus === "loaded" && (
        <>
          <UserInfo>
            <ProfilePicture
              src={tweet.author.avatarSrc}
              alt={`${tweet.handle}'s profile photo`}
            />
            <TweeterInfo>
              <DisplayName>{tweet.author.displayName}</DisplayName>
              <Handle>@{tweet.author.handle}</Handle>
            </TweeterInfo>
          </UserInfo>
          <TweetContent>
            <Status>{tweet.status}</Status>
            <TweetPicture src={tweet.media[0].url} alt={`tweet picture`} />
            <TimePosted> {tweet.timestamp}</TimePosted>
          </TweetContent>
          <ActionBar />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px;
`;

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

const TimePosted = styled.span``;

const Status = styled.p``;

const TweetPicture = styled.img`
  max-width: 100%;
  border-radius: 20px;
`;

export default TweetDetails;
