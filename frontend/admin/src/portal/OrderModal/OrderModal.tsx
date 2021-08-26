import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import OrderCard from '@src/portal/OrderModal/OrderCard';
import Portal from '@src/portal/portal';
import { Order } from '@src/types/Order';
import CloseButton from '@src/components/CloseButton/CloseButton';

interface OrderModalInterface {
  order: Order;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalInterface> = ({ order, onClose }) => {
  const handleClickBlurBg = () => {
    onClose();
  };

  const handleClickContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <ModalContainer onClick={handleClickBlurBg}>
        <OrderModalContent onClick={handleClickContent}>
          <OrderCard order={order} />
          <CloseButton onClick={onClose} />
        </OrderModalContent>
      </ModalContainer>
    </Portal>
  );
};

const ModalContainer = styled('div')`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000020;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const OrderModalContent = styled('div')`
  z-index: 1005;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 800px;
  width: 1000px;
  margin: auto;
  background-color: white;
  border-radius: 8px;
`;

export default OrderModal;
