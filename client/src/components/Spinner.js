import React from "react";
import { Icon } from "react-icons-kit";
import { loader } from "react-icons-kit/feather/loader";
import { COLORS } from "../constants";
import styled, { keyframes } from "styled-components";

export const Spinner = () => {
  return (
    <Wrapper>
      <SpinnerIcon icon={loader} size={75} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 50px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.primary};
`;

const SpinnerIcon = styled(Icon)`
  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
