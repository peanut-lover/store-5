import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  displayTime: number;
  color?: string;
  onDisplayTimeEnd: () => void;
  positionRow?: 'left' | 'center' | 'right';
  positionColumn?: 'top' | 'bottom';
}

const DEAFULT_COLOR = '#000000';
const SLIDE_DURATION = 0.2;
const NUMBER_OF_ANIMATIONS = 2;
const TOAST_OPACITY = 80;

const Toast: React.FC<Props> = ({ children, displayTime, color, onDisplayTimeEnd, positionRow, positionColumn }) => {
  const ToastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ToastRef.current === null) return;

    let count = 0;
    const onAnimationEnd = () => {
      count++;
      if (count === NUMBER_OF_ANIMATIONS) onDisplayTimeEnd();
    };

    ToastRef.current.addEventListener('animationend', onAnimationEnd);
  }, []);

  return (
    <Wrapper
      ref={ToastRef}
      displayTime={displayTime}
      color={color || DEAFULT_COLOR}
      positionRow={positionRow || 'center'}
      positionColumn={positionColumn || 'bottom'}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  displayTime: number;
  color: string;
  positionRow: 'left' | 'center' | 'right';
  positionColumn: 'top' | 'bottom';
}>`
  position: fixed;
  padding: 2rem;
  font-size: 1.5rem;
  border-radius: 1rem;
  color: white;
  background-color: ${(props) => props.color}${TOAST_OPACITY};
  transition: linear 1s;
  z-index: 99;
  pointer-events: none;

  animation-name: ${({ positionRow, positionColumn }) => `slideup${positionRow}${positionColumn}`},
    ${({ positionRow, positionColumn }) => `slidedown${positionRow}${positionColumn}`};
  animation-delay: 0s, ${(props) => props.displayTime / 1000 + SLIDE_DURATION}s;
  animation-duration: ${SLIDE_DURATION}s;
  animation-fill-mode: forwards;

  ${({ positionRow }) => {
    switch (positionRow) {
      case 'center':
        return 'left: 50%';
      case 'left':
        return 'left: 0';
      case 'right':
        return 'right: 0';
    }
  }};
  ${({ positionColumn }) => {
    switch (positionColumn) {
      case 'top':
        return 'top: 0';
      case 'bottom':
        return 'bottom: 0';
    }
  }};

  transform: translate(
    ${({ positionRow }) => {
      switch (positionRow) {
        case 'center':
          return '-50%';
        case 'left':
          return '2rem';
        case 'right':
          return '-2rem';
      }
    }},
    ${({ positionColumn }) => {
      switch (positionColumn) {
        case 'top':
          return '-8rem';
        case 'bottom':
          return '8rem';
      }
    }}
  );

  @keyframes ${({ positionRow, positionColumn }) => `slideup${positionRow}${positionColumn}`} {
    to {
      transform: translate(
        ${({ positionRow }) => {
          switch (positionRow) {
            case 'center':
              return '-50%';
            case 'left':
              return '8rem';
            case 'right':
              return '-8rem';
          }
        }},
        ${({ positionColumn }) => {
          switch (positionColumn) {
            case 'top':
              return '2rem';
            case 'bottom':
              return '-2rem';
          }
        }}
      );
    }
  }

  @keyframes ${({ positionRow, positionColumn }) => `slidedown${positionRow}${positionColumn}`} {
    to {
      transform: translate(
        ${({ positionRow }) => {
          switch (positionRow) {
            case 'center':
              return '-50%';
            case 'left':
              return '2rem';
            case 'right':
              return '-2rem';
          }
        }},
        ${({ positionColumn }) => {
          switch (positionColumn) {
            case 'top':
              return '-8rem';
            case 'bottom':
              return '8rem';
          }
        }}
      );
    }
  }
`;

export default Toast;
