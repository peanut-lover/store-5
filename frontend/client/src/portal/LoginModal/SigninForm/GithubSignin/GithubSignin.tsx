import React from 'react';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

const GithubSignin = () => {
  return (
    <GithubSigninContainer>
      <IconContainer>
        <AiFillGithub size='3em' color='#fff' />
        <Span>GitHub로 접속하기</Span>
      </IconContainer>
    </GithubSigninContainer>
  );
};

const GithubSigninContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 50%;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #fff;
  padding: 12px;
  margin: auto;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: RGBA(255, 255, 255, 0.13);
  }
`;

const Span = styled.span`
  color: #fff;
  font-size: 2em;
  margin-left: 12px;
`;

export default GithubSignin;
