import React from 'react';
import styled from 'styled-components';

const Loading: React.FC = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
