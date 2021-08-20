import React from 'react';
import styled from 'styled-components';

interface Props {
  displayTime: number;
  color?: string;
}

const DEAFULT_COLOR = '#000000';
const SLIDE_DURATION = 0.2;

const Toast: React.FC<Props> = ({ children, displayTime, color }) => {
  return (
    <Wrapper displayTime={displayTime} color={color || DEAFULT_COLOR}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ displayTime: number; color: string }>`
  position: fixed;
  left: 50%;
  bottom: 0;
  padding: 2rem;
  font-size: 1.5rem;
  border-radius: 1rem;
  color: white;
  background-color: ${(props) => props.color}80;
  transition: linear 1s;

  animation-name: slideup, slidedown;
  animation-delay: 0s, ${(props) => props.displayTime / 1000 - SLIDE_DURATION}s;
  animation-duration: ${SLIDE_DURATION}s;
  animation-fill-mode: forwards;

  transform: translate(-50%, 8rem);
  @keyframes slideup {
    to {
      transform: translate(-50%, -2rem);
    }
  }

  @keyframes slidedown {
    to {
      transform: translate(-50%, 8rem);
    }
  }
`;

export default Toast;
