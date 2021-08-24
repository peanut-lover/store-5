import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsAmount from './GoodsAmount/GoodsAmount';
import { DetailGoods, GoodsBeforeOrder } from '@src/types/Goods';
import React, { useState, useCallback, useEffect } from 'react';
import { deleteWish, postWish } from '@src/apis/wishAPI';
import { getGoodsStockCount } from '@src/apis/goodsAPI';
import { createCart } from '@src/apis/cartAPI';
import usePushToOrderPage from '@src/hooks/usePushToOrderPage';
import { usePushHistory } from '@src/lib/CustomRouter';
import theme from '@src/theme/theme';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';

interface Props {
  goods: DetailGoods;
}

const DEFAULT_AMOUNT = 1;

const ERROR_SERVER = '서버 문제로 요청에 실패하였습니다!';
const ADD_WISH = '찜하기 목록에 추가하였습니다.';
const DELETE_WISH = '찜하기 목록에서 삭제하였습니다.';

const GoodsInteractive: React.FC<Props> = ({ goods }) => {
  const { id, title, price, deliveryFee = 0, discountRate = 0, isWish = false } = goods;

  const pushToast = usePushToast();
  const pushToOrderPage = usePushToOrderPage();
  const push = usePushHistory();

  const [isWished, setIsWished] = useState(isWish);
  const [isOver, setIsOver] = useState(false);
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [disabled, setDisabled] = useState(false);

  const handleToWish = useCallback(async () => {
    if (disabled) return;
    setDisabled(true);
    try {
      const result = isWished ? await deleteWish(id) : await postWish(id);
      pushToast({ text: isWished ? DELETE_WISH : ADD_WISH, color: theme.primary });
      if (result) setIsWished(!isWished);
    } catch (error) {
      console.log(error);
      pushToast({ text: ERROR_SERVER, color: theme.error });
    } finally {
      setDisabled(false);
    }
  }, [isWished, disabled]);

  const handleAddToOrder = useCallback(async () => {
    if (isOver || disabled || amount === 0) return;
    const orderGoods: GoodsBeforeOrder = { goods, amount };
    pushToOrderPage([orderGoods]);
  }, [isOver, disabled, amount]);

  const addToCart = useCallback(async () => {
    if (isOver || disabled || amount === 0) return;
    setDisabled(true);
    try {
      await createCart({ goodsId: id, amount });
      push('/cart');
    } catch (error) {
      console.log(error);
      pushToast({ text: ERROR_SERVER, color: theme.error });
    } finally {
      setDisabled(false);
    }
  }, [isOver, amount, disabled]);

  const fetchCheckStock = async () => {
    if (disabled) return;
    setDisabled(true);
    try {
      const data = await getGoodsStockCount(id);
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
    fetchCheckStock();
  }, [amount]);

  useEffect(() => {
    setIsWished(isWish);
    setAmount(DEFAULT_AMOUNT);
  }, [id]);

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
        goodsId={id}
        clickable={!isOver && amount > 0}
        onToggleWish={handleToWish}
        addToCart={addToCart}
        fetchCheckStock={fetchCheckStock}
      />
    </div>
  );
};

export default GoodsInteractive;
