import { useRecoilState } from 'recoil';

import { usePushHistory } from '@src/lib/CustomRouter';
import { orderState } from '@src/recoil/orderState';
import { GoodsBeforeOrder } from '@src/types/Goods';

const usePushToOrderPage = () => {
  const [_, setOrderState] = useRecoilState(orderState);
  const pushHistory = usePushHistory();

  async function setOrderGoodsList(orderGoodsList: GoodsBeforeOrder[]) {
    setOrderState(orderGoodsList);
  }

  const pushToOrderPage = async (orderGoodsList: GoodsBeforeOrder[]) => {
    await setOrderGoodsList(orderGoodsList);
    pushHistory('/order');
  };

  return pushToOrderPage;
};

export default usePushToOrderPage;
