import SigninForm from '@src/portal/LoginModal/SigninForm/SigninForm';
import Portal from '@src/portal/portal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

interface Props {
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
          <SigninForm />
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
  min-width: 400px;
  width: 20%;
  height: 40%;
  margin: auto;
  background-color: transparent;
  border-radius: 12px;
`;

export default LoginModal;
