import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import { COLORS } from "../constants";

const HomeTweetBox = () => {
  const { currentUser, status, setSentTweet } = useContext(CurrentUserContext);

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    console.log("nop");
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value,
      }),
    });

    setValue("");
  };

  const charCount = 300 - value.length;

  return (
    <Wrapper>
      {status === "loading" && <div>loading...</div>}
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
`;

const PicDiv = styled.div``;

const Pic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 10px;
`;

const TextDiv = styled.div``;

const Input = styled.textarea`
  width: 100%;
  height: 150px;
`;

const CharAndSendDiv = styled.div`
  padding: 10px;
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
`;

export default HomeTweetBox;
