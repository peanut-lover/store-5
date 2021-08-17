import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsAmount from './GoodsAmount/GoodsAmount';
import { DetailGoods } from '@src/types/Goods';
import React, { useState, useCallback, useEffect } from 'react';
import { deleteWish, postWish } from '@src/apis/wishApi';
import { getGoodsStockCount } from '@src/apis/goodsAPI';

interface Props {
  goods: DetailGoods;
}

const GoodsInteractive: React.FC<Props> = ({
  goods: { id, title, price, deliveryFee = 0, discountRate = 0, isWish = false },
}) => {
  const [isWished, setIsWished] = useState(isWish);
  const [isOver, setIsOver] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleToWish = useCallback(async () => {
    const result = await (isWished ? deleteWish(id) : postWish(id));
    if (result) setIsWished(!isWished);
  }, [isWished]);
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

  const fetchCheckStock = async (goodsId: number) => {
    try {
      const data = await getGoodsStockCount(goodsId);
      const stock = data.result;
      if (stock < amount) setIsOver(true);
      else setIsOver(false);
    } catch (e) {
      // TODO: 구매 불가능한 상태에 대한 처리 필요.
      setIsOver(false);
    }
  };

  useEffect(() => {
    fetchCheckStock(id);
  }, [amount]);

  return (
    <div>
      <GoodsAmount
        title={title}
        price={price}
        amount={amount}
        deliveryFee={deliveryFee}
        discountRate={discountRate}
        isOver={isOver}
        onChangeAmount={handleChangeAmount}
      />
      <GoodsButtons
        isWish={isWished}
        onToggleWish={() => {
          // TODO: implementation
        }}
        onAddToCart={handleAddToCart}
        onAddToOrder={handleAddToOrder}
      />
    </div>
  );
};

export default GoodsInteractive;
