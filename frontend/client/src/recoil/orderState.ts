import { GoodsBeforeOrder } from '@src/types/Goods';
import { atom } from 'recoil';

export const orderState = atom<GoodsBeforeOrder[]>({
  key: 'orderState',
  default: [],
});
