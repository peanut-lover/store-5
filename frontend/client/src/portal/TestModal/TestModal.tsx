import React from 'react';
import styled from 'styled-components';
import Portal from '../portal';

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000080;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  margin: auto;
  background-color: white;
  border-radius: 12px;
`;
const TestModal = () => {
  return (
    <Portal>
      <Container>
        <Content>이것은 Test Modal 입니다.</Content>
      </Container>
    </Portal>
  );
};

export default TestModal;
