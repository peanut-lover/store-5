import React, { RefObject, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import theme from '@src/theme/theme';
import useUserState from '@src/hooks/useUserState';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';

interface Props {
  isWish: boolean;
  goodsId: number;
  clickable: boolean;
  onToggleWish: () => void;
  addToCart: () => void;
  fetchCheckStock: (goodsId: number) => Promise<void>;
  onOrder: () => void;
}

const NEED_LOGIN = '로그인이 필요합니다!';

const GoodsButtons: React.FC<Props> = ({ isWish, clickable, onToggleWish, addToCart, onOrder }) => {
  const [user] = useUserState();
  const pushToast = usePushToast();

  const handleClickButton = (onCallback: () => void) => {
    if (!user || !user.isLoggedIn) {
      pushToast({ text: NEED_LOGIN, color: theme.error });
    } else {
      onCallback();
    }
  };
  return (
    <>
      <GoodsButtonsContainer>
        <WishButton onClick={() => handleClickButton(onToggleWish)}>
          {isWish && user.isLoggedIn ? <FaHeart fill={theme.primary} /> : <FaRegHeart />}
        </WishButton>
        <CartButton clickable={clickable} onClick={() => handleClickButton(addToCart)}>
          장바구니
        </CartButton>
        <OrderButton clickable={clickable} onClick={() => handleClickButton(onOrder)}>
          바로 구매
        </OrderButton>
      </GoodsButtonsContainer>
    </>
  );
};

interface ButtonProps {
  clickable: boolean;
}

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

const CartButton = styled.button<ButtonProps>`
  text-align: center;
  width: 30%;
  height: 3.5rem;
  border: 1px solid #bbb;
  background-color: #fff;
  font-weight: 600;
  opacity: ${({ clickable }) => (clickable ? '0.9' : '0.5')};
  ${({ clickable }) => clickable && 'cursor: pointer;'}
  &:hover {
    ${({ clickable }) => clickable && 'opacity:1;'}
  }
`;

const OrderButton = styled.button<ButtonProps>`
  text-align: center;
  width: 40%;
  height: 3.5rem;
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  opacity: ${({ clickable }) => (clickable ? '0.9' : '0.5')};
  ${({ clickable }) => clickable && 'cursor: pointer;'}
  &:hover {
    ${({ clickable }) => clickable && 'opacity:1;'}
  }
`;

export default GoodsButtons;
