import { DetailGoods } from '@src/types/Goods';
import { atom } from 'recoil';

const RecentGoodsStorageKey = 'recentGoodsHistory';

const makeUniqueDetailGoodsList = (goodsList: DetailGoods[]) => {
  const idSet = new Set<number>();
  goodsList.forEach((goods) => idSet.add(goods.id));
  return Array.from(idSet.keys()).map((id) => goodsList.find((goods) => goods.id === id)!);
};

const originStorageValues = localStorage.getItem(RecentGoodsStorageKey);
const initDetailGoods: DetailGoods[] = originStorageValues ? JSON.parse(originStorageValues) : [];
const initState = makeUniqueDetailGoodsList(initDetailGoods);

export const recentlyGoodsState = atom<DetailGoods[]>({
  key: 'recentlyGoodsState',
  default: initState,
});
