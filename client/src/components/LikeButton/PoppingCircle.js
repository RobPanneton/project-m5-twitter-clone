import React, { useContext } from "react";

import styled, { keyframes } from "styled-components";

const PoppingCircle = ({ size, color }) => {
  return (
    <Wrapper
      style={{
        width: size,
        height: size,
        background: color,
      }}
    ></Wrapper>
  );
};

const fadeIn = keyframes`
from {
    opacity: 1;
}to {
    opacity: 0;
}`;

const scaleOut = keyframes`
from {
    transform: scale(0);
} to {
    transform: scale(1);
}
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 500ms forwards, ${scaleOut} 300ms forwards;
  position: absolute;
  border-radius: 50%;
`;

export default PoppingCircle;
