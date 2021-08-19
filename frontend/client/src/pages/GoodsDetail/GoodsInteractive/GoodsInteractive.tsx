import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsAmount from './GoodsAmount/GoodsAmount';
import { DetailGoods, GoodsBeforeOrder } from '@src/types/Goods';
import React, { useState, useCallback, useEffect } from 'react';
import { deleteWish, postWish } from '@src/apis/wishAPI';
import { getGoodsStockCount } from '@src/apis/goodsAPI';
import { createCart } from '@src/apis/cartAPI';
import usePushToOrderPage from '@src/hooks/usePushToOrderPage';

interface Props {
  goods: DetailGoods;
}

const GoodsInteractive: React.FC<Props> = ({ goods }) => {
  const { id, title, price, deliveryFee = 0, discountRate = 0, isWish = false } = goods;
  const pushToOrderPage = usePushToOrderPage();

  const [isWished, setIsWished] = useState(isWish);
  const [isOver, setIsOver] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleToWish = useCallback(async () => {
    const result = await (isWished ? deleteWish(id) : postWish(id));
    if (result) setIsWished(!isWished);
  }, [isWished]);

  // const handleToWish = useCallback(async () => {}, []);
  const handleAddToCart = useCallback(() => {
    console.log('장바구니 추가 API', 'goods id:', id);
  }, []);

  const handleAddToOrder = () => {
    const orderGoods: GoodsBeforeOrder = { goods, amount };
    pushToOrderPage([orderGoods]);
  };

  const addToCart = useCallback(async () => {
    console.log('장바구니 추가 API', 'goods id:', id);
    if (isOver) {
      // 수량 초과 모달
    } else {
      const result = await createCart({ goodsId: id, amount });
      // 장바구니 이동 안내 모달
    }
  }, [amount]);

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
        setAmount={setAmount}
      />
      <GoodsButtons
        isWish={isWished}
        amount={amount}
        goodsId={id}
        onToggleWish={handleToWish}
        addToCart={addToCart}
        fetchCheckStock={fetchCheckStock}
      />
    </div>
  );
};

export default GoodsInteractive;
