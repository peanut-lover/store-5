import { DetailGoods } from '@src/types/Goods';
import { atom } from 'recoil';

export const RECENT_GOODS_STORAGE_KEY = 'recentGoodsHistory';

export const makeUniqueDetailGoodsList = (goodsList: DetailGoods[]) =>
  goodsList
    .map((goods) => goods.id)
    .filter((v, i, self) => self.indexOf(v) === i) // number 중복 제거
    .map((id) => goodsList.find((goods) => goods.id === id)!);

const initDetailGoodsInLocalStorage = (): DetailGoods[] => {
  const originStorageValues = localStorage.getItem(RECENT_GOODS_STORAGE_KEY);
  try {
    const initDetailGoods: DetailGoods[] = originStorageValues ? JSON.parse(originStorageValues) : [];
    return makeUniqueDetailGoodsList(initDetailGoods);
  } catch (err) {
    return [];
  }
};

export const recentlyGoodsState = atom<DetailGoods[]>({
  key: 'recentlyGoodsState',
  default: initDetailGoodsInLocalStorage(),
});
