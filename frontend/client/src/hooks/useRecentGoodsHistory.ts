import { DetailGoods } from '@src/types/Goods';
import { useState } from 'react';

const RecentGoodsStorageKey = 'recentGoodsHistory';

type HookState = DetailGoods[];
type HookStateUpdateFn = (state: DetailGoods[]) => void;
type HookStateResetFn = () => void;

type RecentGoodsHistoryHookReturnType = [HookState, HookStateUpdateFn, HookStateResetFn];

type RecentGoodsHistoryHook = (max?: number) => RecentGoodsHistoryHookReturnType;

const useRecentGoodsHistory: RecentGoodsHistoryHook = (max: number = 10) => {
  const originStorageValues = localStorage.getItem(RecentGoodsStorageKey);
  const initialState = originStorageValues ? JSON.parse(originStorageValues) : [];
  const [recentGoodsList, _setRecentGoodsList] = useState<DetailGoods[]>(initialState);

  const setRecentGoodsList = (goodsList: DetailGoods[]) => {
    const newGoodsList = goodsList.slice(0, max - 1);
    localStorage.setItem(RecentGoodsStorageKey, JSON.stringify(newGoodsList));
    _setRecentGoodsList(newGoodsList);
  };

  const reset = () => {
    _setRecentGoodsList([]);
    localStorage.removeItem(RecentGoodsStorageKey);
  };

  return [recentGoodsList, setRecentGoodsList, reset];
};

export default useRecentGoodsHistory;
