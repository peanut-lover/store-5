import React from 'react';
import { BsPeopleCircle } from 'react-icons/bs';
import styled from 'styled-components';

const SampleSignin = () => {
  return (
    <SampleSigninContainer>
      <IconContainer>
        <BsPeopleCircle size='3em' color='#2AC1BC' />
        <Span>시연용으로 접속하기</Span>
      </IconContainer>
    </SampleSigninContainer>
  );
};
const SampleSigninContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 50%;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #2ac1bc;
  padding: 12px;
  margin: auto;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: RGBA(42, 195, 188, 0.19);
  }
`;

const Span = styled.span`
  color: #2ac1bc;
  font-size: 2em;
  margin-left: 12px;
`;

export default SampleSignin;
