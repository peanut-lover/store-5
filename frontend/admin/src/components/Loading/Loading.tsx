import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingCircle>
        <i></i>
        <i></i>
        <i></i>
      </LoadingCircle>
      <p>Loading...</p>
    </LoadingContainer>
  );
};

const scaleBounce = keyframes`
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1.3);
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 200px;
  text-align: center;
  background: transparent;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.2);
  p {
    margin-top: 20px;
    font-size: 18px;
  }
`;
const LoadingCircle = styled.div`
  padding-top: 10px;
  i {
    animation: ${scaleBounce} 0.3s alternate infinite;
    display: inline-block;
    margin: 0 4px;
    width: 10px;
    height: 10px;
    background: #00a5e5;
    border-radius: 50em;
  }
  i:nth-child(2) {
    animation-delay: 0.1s;
  }
  i:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

export default Loading;
