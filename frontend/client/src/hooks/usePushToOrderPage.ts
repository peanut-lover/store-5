import { usePushHistory } from '@src/lib/CustomRouter';
import { orderState } from '@src/recoil/orderState';
import { GoodsBeforeOrder } from '@src/types/Goods';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

const usePushToOrderPage = () => {
  const [orderGoodsList, setOrderState] = useRecoilState(orderState);
  const pushHistory = usePushHistory();
  const isInitialEffect = useRef(true);

  const pushToOrderPage = (orderGoodsList: GoodsBeforeOrder[]) => {
    setOrderState(orderGoodsList);
  };

  useEffect(() => {
    if (isInitialEffect.current) {
      isInitialEffect.current = false;
      return;
    }

    pushHistory('/order');
  }, [orderGoodsList]);

  return pushToOrderPage;
};

export default usePushToOrderPage;
