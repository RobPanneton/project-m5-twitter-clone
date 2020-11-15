import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import Tweet from "./Tweet";
import { Spinner } from "./Spinner";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Feed = () => {
  const {
    currentUser,
    status,
    setStatus,
    executeTweet,
    setExecuteTweet,
  } = useContext(CurrentUserContext);

  const [feed, setFeed] = useState();
  const [tweetIds, setTweetIds] = useState();
  const [tweetsById, setTweetsById] = useState();
  const [feedLoadStatus, setFeedLoadStatus] = useState("laoding");
  let { profileId } = useParams();

  useEffect(() => {
    const ac = new AbortController();
    if (!profileId) profileId = "me";
    if (profileId === "me") {
      fetch(`/api/me/home-feed`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTweetIds(data.tweetIds);
          setTweetsById(data.tweetsById);
          setFeedLoadStatus("loaded");
        })
        .catch((err) => setStatus("error"));
    } else {
      fetch(`/api/${profileId}/feed`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTweetIds(data.tweetIds);
          setTweetsById(data.tweetsById);
          setFeedLoadStatus("loaded");
        });
    }

    return () => {
      ac.abort();
    };
  }, [executeTweet, profileId]);

  if (status === "error") {
    return <ErrorPage />;
  }
  return (
    <Wrapper>
      {/* {feedLoadStatus === "loading" && <Spinner />} */}
      {feedLoadStatus === "loaded" &&
        tweetIds?.map((Id) => {
          return (
            <Tweet
              key={Id}
              feedLoadStatus={feedLoadStatus}
              tweet={tweetsById[Id]}
            />
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Feed;
