import { CartGoods } from '@src/types/Goods';
import { atom } from 'recoil';

export const cartState = atom<CartGoods[]>({
  key: 'cartState',
  default: [],
});
