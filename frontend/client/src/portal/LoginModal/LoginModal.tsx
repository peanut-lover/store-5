import SigninForm from '@src/portal/LoginModal/SigninForm/SigninForm';
import SignupForm from '@src/portal/LoginModal/SignupForm/SignupForm';
import Portal from '@src/portal/portal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

interface Props {
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSignin, setIsSignin] = useState(true);
  const handleChangeToSignup = useCallback(() => {
    setIsSignin(false);
  }, [setIsSignin]);
  const handleChangeToSignin = useCallback(() => {
    setIsSignin(true);
  }, [setIsSignin]);

  const handleClose = useCallback((e) => {
    const el = e.target;
    if (modalRef.current && modalRef.current.contains(el)) return;
    onClose();
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <Portal>
      <ModalContainer>
        <FormContainer ref={modalRef}>
          {isSignin ? (
            <SigninForm onClickSignup={handleChangeToSignup} />
          ) : (
            <SignupForm onClickSignin={handleChangeToSignin} />
          )}
        </FormContainer>
      </ModalContainer>
    </Portal>
  );
};

const openOpacity = keyframes`
  0% {
    opacity : 0
  }
  100% {
    opacity : 1
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000080;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${openOpacity} 300ms;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 60%;
  margin: auto;
  background-color: white;
  border-radius: 12px;
`;

export default LoginModal;
