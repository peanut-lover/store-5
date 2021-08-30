import React from 'react';
import styled from 'styled-components';

import GithubSignin from './GithubSignin/GithubSignin';
import SampleSignin from './SampleSignin/SampleSignin';

interface Props {
  onClose: () => void;
}

const SigninForm: React.FC<Props> = ({ onClose }) => {
  return (
    <SigninFormContainer>
      <SampleSignin onClose={onClose} />
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
