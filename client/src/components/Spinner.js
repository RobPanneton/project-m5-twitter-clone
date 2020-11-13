import React from "react";
import { Icon } from "react-icons-kit";
import { loader } from "react-icons-kit/feather/loader";
import { COLORS } from "../constants";
import styled from "styled-components";

export const Spinner = () => {
  return (
    <Wrapper>
      <SpinnerIcon icon={loader} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.primary};
`;

const SpinnerIcon = styled(Icon)`
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate() (360deg);
    }
  }
`;
