import React, { useRef } from 'react';
import styled from 'styled-components';
import Portal from '@src/portal/portal';
import ModalBar from '../ModalBar/ModalBar';

interface Props {
  title: string;
  onClose?: () => void;
  disabled?: boolean;
}

const Modal: React.FC<Props> = ({ children, title, onClose, disabled }) => {
  const dimRef = useRef(null);

  return (
    <Portal>
      <ModalDim
        ref={dimRef}
        onClick={(e) => {
          if (e.target === dimRef.current && !disabled) onClose?.();
        }}
      >
        <Wrapper>
          <ModalBar title={title} onClickExit={onClose} disabled={disabled} />
          <Content>{children}</Content>
        </Wrapper>
      </ModalDim>
    </Portal>
  );
};

const ModalDim = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000020;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  text-align: left;
  font-family: initial;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 480px;
  transform: translate(-50%, -50%);
  margin: auto;
  background-color: white;
  overflow: hidden;
`;

const Content = styled.div`
  min-height: 240px;
  max-height: 480px;
  padding: 1rem;
  overflow-y: auto;
  position: relative;
`;

export default Modal;
