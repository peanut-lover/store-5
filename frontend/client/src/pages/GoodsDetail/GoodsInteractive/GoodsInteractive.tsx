import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsAmount from './GoodsAmount/GoodsAmount';
import { DetailGoods } from '@src/types/Goods';
import React, { useCallback, useState } from 'react';

const GoodsInteractive = ({ id, title, price, deliveryFee, discountRate = 0, isWished = false }: DetailGoods) => {
  const [amount, setAmount] = useState(0);
  useCallback(() => {}, []);
  useCallback(() => {}, []);
  useCallback(() => {}, []);
  return (
    <div>
      <GoodsAmount
        title={title}
        price={price}
        deliveryFee={deliveryFee}
        discountRate={discountRate}
        amount={amount}
        setAmount={setAmount}
      />
      <GoodsButtons isWished={isWished} goodsId={id} amount={amount} />
    </div>
  );
};

export default GoodsInteractive;
