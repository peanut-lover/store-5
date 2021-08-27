import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Portal from '@src/portal/portal';
import CartForm from './CartForm/CartForm';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import Dim from '@src/components/Dim/Dim';

interface Props {
  onClose: () => void;
  goodsId: null | number;
}

const CartModal: React.FC<Props> = ({ onClose, goodsId }) => {
  if (!goodsId) return null;
  return (
    <Portal>
      <Dim onClick={onClose}>
        <FormContainer>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
          <CartForm goodsId={goodsId} onClose={onClose} />
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
  width: 50vw;
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
