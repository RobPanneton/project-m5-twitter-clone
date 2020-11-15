import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import { COLORS } from "../constants";
import ErrorPage from "./ErrorPage";
import { Spinner } from "./Spinner";

const HomeTweetBox = () => {
  const {
    currentUser,
    status,
    setStatus,
    executeTweet,
    setExecuteTweet,
  } = useContext(CurrentUserContext);

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value,
      }),
    })
      .then(() => {
        setExecuteTweet(executeTweet + 1);
      })
      .catch((err) => {
        setStatus(true);
      });

    setValue("");
  };

  const charCount = 300 - value.length;

  if (status === "error") {
    return <ErrorPage />;
  }
  return (
    <Wrapper>
      {status === "loading" && <Spinner />}
      {status === "loaded" && (
        <>
          {" "}
          <PicDiv>
            <Pic src={currentUser.avatarSrc} alt="your profile picture" />
          </PicDiv>
          <TextDiv>
            <Input
              type="text"
              placeholder="What's happening?"
              value={value}
              onChange={(ev) => {
                setValue(ev.target.value);
              }}
            ></Input>
          </TextDiv>
          <CharAndSendDiv>
            {charCount > 55 && <Chars className="green">{charCount}</Chars>}
            {charCount <= 55 && charCount >= 0 && (
              <Chars className="yellow">{charCount}</Chars>
            )}
            {charCount < 0 && <Chars className="red">{charCount}</Chars>}
            <SendButton onClick={(e) => handleSubmit(e)}>Meow</SendButton>
          </CharAndSendDiv>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 200px;
  border-bottom: 4px solid lightgray;
  display: flex;
  margin-bottom: 12px;
  width: 100%;
  padding: 20px 24px;
`;

const PicDiv = styled.div``;

const Pic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 10px;
`;

const TextDiv = styled.div`
  width: 100%;
`;

const Input = styled.textarea`
  width: 100%;
  height: 150px;
  outline: none;
  resize: none;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 24px;
`;

const CharAndSendDiv = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Chars = styled.span`
  &.green {
    color: green;
  }
  &.red {
    color: red;
  }
  &.yellow {
    color: yellow;
  }
`;

const SendButton = styled.button`
  background-color: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  margin-left: 10px;
  height: 50px;
`;

export default HomeTweetBox;
