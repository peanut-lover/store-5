import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsAmount from './GoodsAmount/GoodsAmount';
import { DetailGoods, GoodsBeforeOrder } from '@src/types/Goods';
import React, { useState, useCallback, useEffect } from 'react';
import { deleteWish, postWish } from '@src/apis/wishAPI';
import { getGoodsStockCount } from '@src/apis/goodsAPI';
import { createCart } from '@src/apis/cartAPI';
import usePushToOrderPage from '@src/hooks/usePushToOrderPage';
import { usePushHistory } from '@src/lib/CustomRouter';

interface Props {
  goods: DetailGoods;
}

// TODO: 에러 및 구매 불가 안내 (토스트 팝업)
const GoodsInteractive: React.FC<Props> = ({ goods }) => {
  const { id, title, price, deliveryFee = 0, discountRate = 0, isWish = false } = goods;
  const pushToOrderPage = usePushToOrderPage();
  const push = usePushHistory();

  const [isWished, setIsWished] = useState(isWish);
  const [isOver, setIsOver] = useState(false);
  const [amount, setAmount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleToWish = useCallback(async () => {
    if (disabled) return;
    setDisabled(true);
    try {
      const result = await (isWished ? deleteWish(id) : postWish(id));
      if (result) setIsWished(!isWished);
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  }, [isWished]);

  const handleAddToOrder = async () => {
    await fetchCheckStock;
    if (isOver) return;
    const orderGoods: GoodsBeforeOrder = { goods, amount };
    pushToOrderPage([orderGoods]);
  };

  const addToCart = useCallback(async () => {
    if (disabled) return;
    setDisabled(true);
    try {
      if (!isOver) {
        await createCart({ goodsId: id, amount });
        push('/cart');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  }, [amount, isOver]);

  const fetchCheckStock = async (goodsId: number) => {
    if (disabled) return;
    setDisabled(true);
    try {
      const data = await getGoodsStockCount(goodsId);
      const stock = data.result;
      if (stock < amount) setIsOver(true);
      else setIsOver(false);
    } catch (e) {
      setIsOver(false);
    } finally {
      setDisabled(false);
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
        onOrder={handleAddToOrder}
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
