import { useRecoilState } from 'recoil';

import { usePushHistory } from '@src/lib/CustomRouter';
import { orderState } from '@src/recoil/orderState';
import { GoodsBeforeOrder } from '@src/types/Goods';

const usePushToOrderPage = () => {
  const [_, setOrderState] = useRecoilState(orderState);
  const pushHistory = usePushHistory();

  async function setOrderGoodsList(orderGoodsList: GoodsBeforeOrder[], cartIds?: number[]) {
    setOrderState({ goodsList: orderGoodsList, cartIds });
  }

  const pushToOrderPage = async (orderGoodsList: GoodsBeforeOrder[], cartIds?: number[]) => {
    await setOrderGoodsList(orderGoodsList, cartIds);
    pushHistory('/order');
  };

  return pushToOrderPage;
};

export default usePushToOrderPage;
