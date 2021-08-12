import GithubSignin from './GithubSignin/GithubSignin';
import SampleSignin from './SampleSignin/SampleSignin';
import React from 'react';
import styled from 'styled-components';

const SigninForm = () => {
  return (
    <SigninFormContainer>
      <SampleSignin />
      <GithubSignin />
    </SigninFormContainer>
  );
};

const SigninFormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 12px;
`;
export default SigninForm;
