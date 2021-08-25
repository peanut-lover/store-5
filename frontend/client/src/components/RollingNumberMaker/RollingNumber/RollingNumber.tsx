// import { ROLLING_NUMBER } from '@src/constants/rollingNumber';
import TrollingNumber from '@src/constants/rollingNumber';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  txt: string;
}

const RollingNumber: React.FC<Props> = ({ txt }) => {
  if (isNaN(Number(txt))) return <NotRollingText>{txt}</NotRollingText>;
  return (
    <RollingNumberContainer>
      <RealNumber>{txt}</RealNumber>
      <Rolling top={`${-2000 - parseInt(txt) * 100}%`} duration={`${900 + Math.random() * 600}ms`}>
        <TrollingNumber />
      </Rolling>
    </RollingNumberContainer>
  );
};

const rotate1 = keyframes`
  100% {
    transform: translateY(11.98em);
  }
`;

const NotRollingText = styled.div``;

const RollingNumberContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const RealNumber = styled.span`
  visibility: hidden;
  padding-right: 1px;
`;

const Rolling = styled.div<{ top: string; duration: string }>`
  position: absolute;
  overflow: hidden;
  transform-style: preserve-3d;
  opacity: 0.9;
  animation: ${rotate1};
  animation-duration: ${(props) => props.duration};
  top: ${(props) => props.top};
`;

export default RollingNumber;
