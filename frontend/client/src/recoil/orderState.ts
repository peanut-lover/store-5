import { GoodsBeforeOrder } from '@src/types/Goods';
import { atom } from 'recoil';

interface OrderState {
  goodsList: GoodsBeforeOrder[];
  cartIds?: number[];
}

export const orderState = atom<OrderState>({
  key: 'orderState',
  default: {
    goodsList: [],
  },
});
