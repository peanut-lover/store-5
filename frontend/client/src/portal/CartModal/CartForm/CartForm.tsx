import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePushHistory } from '@src/lib/CustomRouter';

import useUserState from '@src/hooks/useUserState';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import MainImage from '@src/pages/GoodsDetail/GoodsImageSection/Mainimage/MainImage';
import GoodsInfo from '@src/pages/GoodsDetail/GoodsInfo/GoodsInfo';
import GoodsAmount from '@src/pages/GoodsDetail/GoodsInteractive/GoodsAmount/GoodsAmount';

import theme from '@src/theme/theme';

import { DetailGoods } from '@src/types/Goods';
import { getGoodsDetail, getGoodsStockCount } from '@src/apis/goodsAPI';
import { createCart } from '@src/apis/cartAPI';

interface Props {
  goodsId: number;
  onClose: () => void;
}

const NEED_LOGIN = '로그인이 필요합니다!';
const ERROR_SERVER_GOODS = '서버 문제로 상품 정보 조회에 실패하였습니다!';
const ERROR_SERVER_STOCK = '서버 문제로 재고 조회에 실패하였습니다!';
const ERROR_SERVER_CART = '서버 문제로 장바구니 등록에 실패하였습니다!';

const CartForm: React.FC<Props> = ({ goodsId, onClose }) => {
  const push = usePushHistory();
  const [user] = useUserState();
  const pushToast = usePushToast();

  const [goods, setGoods] = useState<DetailGoods | null>(null);
  const [isOver, setIsOver] = useState(false);
  const [amount, setAmount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const fetchDetailGoods = async (goodsId: number) => {
    try {
      const data = await getGoodsDetail(goodsId);
      setGoods(data.result);
    } catch (e) {
      onClose();
      pushToast({ text: ERROR_SERVER_GOODS, color: theme.error });
    }
  };

  const fetchCheckStock = async () => {
    try {
      const data = await getGoodsStockCount(goodsId);
      const stock = data.result;
      if (stock < amount) setIsOver(true);
      else setIsOver(false);
    } catch (e) {
      setIsOver(true);
      pushToast({ text: ERROR_SERVER_STOCK, color: theme.error });
    }
  };

  const addToCart = useCallback(async () => {
    if (!user || !user.isLoggedIn) {
      return pushToast({ text: NEED_LOGIN, color: theme.error });
    }
    if (isOver || disabled || amount === 0) return;
    setDisabled(true);
    try {
      await createCart({ goodsId, amount });
      push('/cart');
    } catch (error) {
      console.log(error);
      pushToast({ text: ERROR_SERVER_CART, color: theme.error });
    } finally {
      setDisabled(false);
    }
  }, [amount, disabled, isOver]);

  useEffect(() => {
    fetchDetailGoods(goodsId);
  }, [goodsId]);

  useEffect(() => {
    goods && fetchCheckStock();
  }, [amount]);

  if (!goods) return null;

  return (
    <CartFormContainer>
      <MainImage src={goods.thumbnailUrl ?? ''} />
      <GoodsContentContainer>
        <GoodsInfo goods={goods} />
        <GoodsAmount
          title={goods.title}
          price={goods.price}
          amount={amount}
          deliveryFee={goods?.deliveryFee ?? 0}
          discountRate={goods.discountRate}
          isOver={isOver}
          setAmount={setAmount}
        />
        <CartButton clickable={!isOver && amount > 0} onClick={addToCart}>
          장바구니 담기
        </CartButton>
      </GoodsContentContainer>
    </CartFormContainer>
  );
};

interface ButtonProps {
  clickable: boolean;
}

const CartFormContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  height: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  overflow-y: auto;
`;

const GoodsContentContainer = styled.div``;

const CartButton = styled.div<ButtonProps>`
  text-align: center;
  width: 100%;
  height: 3rem;
  border: 1px solid #bbb;
  background-color: #fff;
  font-weight: 600;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ clickable }) => (clickable ? '0.9' : '0.5')};
  ${({ clickable }) => clickable && 'cursor: pointer;'}
  &:hover {
    ${({ clickable }) => clickable && 'opacity:1;'}
  }
`;

export default CartForm;
