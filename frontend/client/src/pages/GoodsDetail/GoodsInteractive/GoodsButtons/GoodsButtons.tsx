import React, { RefObject, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from '@src/lib/CustomRouter';

interface Props {
  isWish: boolean;
  goodsId: number;
  amount: number;
  onToggleWish: () => void;
  addToCart: () => void;
  fetchCheckStock: (goodsId: number) => Promise<void>;
  onOrder: () => void;
}

const GoodsButtons: React.FC<Props> = ({
  goodsId,
  amount,
  isWish,
  fetchCheckStock,
  onToggleWish,
  addToCart,
  onOrder,
}) => {
  return (
    <>
      <GoodsButtonsContainer>
        <WishButton onClick={onToggleWish}>{isWish ? <FaHeart /> : <FaRegHeart />}</WishButton>
        <CartButton onClick={addToCart}>장바구니</CartButton>
        <OrderButton onClick={onOrder}>바로 구매</OrderButton>
      </GoodsButtonsContainer>
    </>
  );
};

const GoodsButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  column-gap: 0.5rem;
`;

const WishButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid #bbb;
  background-color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartButton = styled.button`
  text-align: center;
  width: 30%;
  height: 3.5rem;
  border: 1px solid #bbb;
  background-color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

const OrderButton = styled.button`
  text-align: center;
  width: 40%;
  height: 3.5rem;
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.85;
  }
`;

export default GoodsButtons;
