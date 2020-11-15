import React, { useState } from "react";
import styled from "styled-components";
import Action from "./Action";
import TweetActionIcon from "./TweetActionIcon";
import LikeButton from "../LikeButton";

const ActionBar = ({ tweet }) => {
  const [optimisticLike, setOptimisticLike] = useState(tweet?.isLiked);
  const [optimisticNumLikes, setOptimisticNumLikes] = useState(tweet?.numLikes);
  const [optimisticRetweet, setOptimisticRetweet] = useState(
    tweet?.isRetweeted
  );
  const [optimisticNumRetweets, setOptimisticNumRetweets] = useState(
    tweet?.numRetweets
  );

  const handleLikeClick = async (id) => {
    const incOrDec = optimisticLike ? -1 : +1;

    setOptimisticLike(!optimisticLike);
    setOptimisticNumLikes(optimisticNumLikes + incOrDec);

    await fetch(`/api/tweet/${id}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: !optimisticLike,
        numLikes: optimisticNumLikes,
      }),
    });
  };

  const handleRetweetClick = async (id) => {
    const incOrDec = optimisticRetweet ? -1 : +1;

    console.log(optimisticRetweet);

    setOptimisticRetweet(!optimisticRetweet);
    setOptimisticNumRetweets(optimisticNumRetweets + incOrDec);
  };

  return (
    <Wrapper>
      <Action color="rgb(27,149,224)" size={40}>
        <TweetActionIcon kind="reply" />
      </Action>
      <Action
        onClick={() => {
          handleRetweetClick(tweet.id);
        }}
        color="rgb(23, 191, 99)"
        size={40}
      >
        <TweetActionIcon
          kind="retweet"
          color={optimisticRetweet ? "rgb(23, 191, 99)" : "currentColor"}
        />
        {optimisticNumRetweets > 0 && (
          <NumDisplay>{optimisticNumRetweets}</NumDisplay>
        )}
      </Action>
      <Action
        onClick={() => {
          handleLikeClick(tweet.id);
        }}
        color="rgb(224, 36, 94)"
        size={40}
      >
        <LikeButton isLiked={optimisticLike} />
        {optimisticNumLikes > 0 && (
          <NumDisplay>{optimisticNumLikes}</NumDisplay>
        )}
      </Action>
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="share" />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`;

const NumDisplay = styled.span`
  position: absolute;
  left: 40px;
`;

export default ActionBar;
