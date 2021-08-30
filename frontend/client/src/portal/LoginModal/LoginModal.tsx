import React from 'react';
import styled from 'styled-components';

import Dim from '@src/components/Dim/Dim';
import SigninForm from '@src/portal/LoginModal/SigninForm/SigninForm';
import Portal from '@src/portal/portal';

interface Props {
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ onClose }) => {
  return (
    <Portal>
      <Dim onClick={onClose}>
        <FormContainer>
          <SigninForm onClose={onClose} />
        </FormContainer>
      </Dim>
    </Portal>
  );
};

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  width: 20%;
  height: 40%;
  margin: auto;
  background-color: transparent;
  border-radius: 12px;
`;

export default LoginModal;
