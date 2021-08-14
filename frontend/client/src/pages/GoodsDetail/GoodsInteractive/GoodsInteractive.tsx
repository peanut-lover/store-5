import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsAmount from './GoodsAmount/GoodsAmount';
import { DetailGoods } from '@src/types/Goods';
import React, { useState, useCallback, FC } from 'react';

interface Props {
  goods: DetailGoods;
}

const GoodsInteractive: FC<Props> = ({
  goods: { id, title, price, deliveryFee, discountRate = 0, isWished = false },
}) => {
  const [amount, setAmount] = useState(0);

  const handleToWish = useCallback(() => {
    console.log('찜하기 토글 API', 'flag:', !isWished, 'goods id:', id);
  }, []);
  const handleAddToCart = useCallback(() => {
    console.log('장바구니 추가 API', 'goods id:', id);
  }, []);
  const handleAddToOrder = useCallback(() => {
    // TODO: 상품 관련 상태 저장 후
    console.log('결제화면으로 이동', 'goods id:', id);
  }, []);

  const handleChangeAmount = (amount: number) => {
    setAmount(amount);
  };

  return (
    <div>
      <GoodsAmount
        title={title}
        price={price}
        amount={amount}
        deliveryFee={deliveryFee}
        discountRate={discountRate}
        onChangAmount={handleChangeAmount}
      />
      <GoodsButtons
        isWished={isWished}
        onToggleWish={handleToWish}
        onAddToCart={handleAddToCart}
        onAddToOrder={handleAddToOrder}
      />
    </div>
  );
};

export default GoodsInteractive;
