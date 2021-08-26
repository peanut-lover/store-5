import { useCallback, useEffect, useState } from 'react';
import { DetailGoods } from '@src/types/Goods';
import { useRecoilState } from 'recoil';
import { recentlyGoodsState } from '@src/recoil/recentGoodsState';

const RecentGoodsStorageKey = 'recentGoodsHistory';

type HookState = DetailGoods[];
type HookStateUpdateFn = (state: DetailGoods[]) => void;
type RecentGoodsHistoryHookReturnType = [HookState, HookStateUpdateFn];

type RecentGoodsHistoryHook = (max?: number) => RecentGoodsHistoryHookReturnType;

const makeUniqueDetailGoodsList = (goodsList: DetailGoods[]) => {
  const idSet = new Set<number>();
  goodsList.forEach((goods) => idSet.add(goods.id));
  return Array.from(idSet.keys()).map((id) => goodsList.find((goods) => goods.id === id)!);
};

const useRecentGoodsHistory: RecentGoodsHistoryHook = (max: number = 10) => {
  const [recentGoodsList, _setRecentGoodsList] = useRecoilState(recentlyGoodsState);

  const setRecentGoodsList = useCallback(
    (goodsList: DetailGoods[]) => {
      const newGoodsList = makeUniqueDetailGoodsList(goodsList.slice(0, max - 1));
      localStorage.setItem(RecentGoodsStorageKey, JSON.stringify(newGoodsList));
      _setRecentGoodsList(newGoodsList);
    },
    [_setRecentGoodsList]
  );

  return [recentGoodsList, setRecentGoodsList];
};

export default useRecentGoodsHistory;
