import React from 'react';
import styled from 'styled-components';
import Portal from '@src/portal/portal';
import { useRef } from 'react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<Props> = ({ children, onConfirm, onCancel }) => {
  const dimRef = useRef(null);

  return (
    <Portal>
      <Dim
        ref={dimRef}
        onClick={(e) => {
          if (e.target !== dimRef.current) {
            return;
          }
          onCancel();
        }}
      >
        <Wrapper>
          <Content>{children}</Content>
          <ButtonGroup>
            <Button onClick={onCancel}>취소</Button>
            <Button
              onClick={() => {
                onConfirm();
                onCancel();
              }}
            >
              확인
            </Button>
          </ButtonGroup>
        </Wrapper>
      </Dim>
    </Portal>
  );
};

const Dim = styled.div`
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  background-color: white;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const Content = styled.div`
  font-family: initial;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 2rem 4rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
`;

const Button = styled.button`
  flex: 1;

  cursor: pointer;
  background-color: white;
  border: none;
  font-size: 1rem;
  padding: 1rem 2rem;
  :first-child {
    border-right: 1px solid #ddd;
  }
  :last-child {
    font-weight: bolder;
  }
`;

export default ConfirmModal;
