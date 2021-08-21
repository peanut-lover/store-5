import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Portal from '@src/portal/portal';
import CartForm from './CartForm/CartForm';
import { FaTimes } from 'react-icons/fa';

interface Props {
  onClose: () => void;
  goodsId: null | number;
}

const CartModal: React.FC<Props> = ({ onClose, goodsId }) => {
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
  if (!goodsId) return null;
  return (
    <Portal>
      <ModalContainer>
        <FormContainer ref={modalRef}>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
          <CartForm goodsId={goodsId} />
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  position: relative;
  width: 50vw;
  max-height: 60vh;
  overflow: auto;
  margin: auto;
  background-color: transparent;
  border-radius: 12px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 1rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  font-size: 24px;
  z-index: 1;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s linear;
  :hover {
    opacity: 1;
  }
`;

export default CartModal;
