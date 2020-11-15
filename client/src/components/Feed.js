import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import Tweet from "./Tweet";
import { Spinner } from "./Spinner";

const Feed = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  const [feed, setFeed] = useState();
  const [tweetIds, setTweetIds] = useState();
  const [tweetsById, setTweetsById] = useState();
  const [feedLoadStatus, setFeedLoadStatus] = useState("laoding");

  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/me/home-feed`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweetIds(data.tweetIds);
        setTweetsById(data.tweetsById);
        setFeedLoadStatus("loaded");
      });

    return () => {
      ac.abort();
    };
  }, []);

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
