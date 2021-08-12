import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsAmount from './GoodsAmount/GoodsAmount';
import { DetailGoods } from '@src/types/Goods';
import React, { useState, useCallback } from 'react';

const GoodsInteractive = ({ id, title, price, deliveryFee, discountRate = 0, isWished = false }: DetailGoods) => {
  const [amount, setAmount] = useState(0);

  const handleToWish = useCallback(() => {
    // TODO 찜하기 API 적용
    // goodsId, userId 전달
  }, []);
  const addToCart = useCallback(() => {
    // TODO 장바구니 API 적용
    // goodsId, userId, amount 전달
  }, []);
  const addToOrder = useCallback(() => {
    // TODO 결제 API 적용
    // goodsId, userId, amount 전달
  }, []);
  return (
    <div>
      <GoodsAmount {...{ title, price, deliveryFee, discountRate, amount, setAmount }} />
      <GoodsButtons {...{ isWished, handleToWish, addToCart, addToOrder }} />
    </div>
  );
};

export default GoodsInteractive;
