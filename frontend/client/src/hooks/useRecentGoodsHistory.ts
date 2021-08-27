import { useCallback } from 'react';
import { DetailGoods } from '@src/types/Goods';
import { useRecoilState } from 'recoil';
import { makeUniqueDetailGoodsList, recentlyGoodsState, RECENT_GOODS_STORAGE_KEY } from '@src/recoil/recentGoodsState';

type HookState = DetailGoods[];
type HookStateUpdateFn = (state: DetailGoods[]) => void;
type RecentGoodsHistoryHookReturnType = [HookState, HookStateUpdateFn];
type RecentGoodsHistoryHook = (max?: number) => RecentGoodsHistoryHookReturnType;

const DEFAULT_MAX_COUNT = 10;

const useRecentGoodsHistory: RecentGoodsHistoryHook = (max: number = DEFAULT_MAX_COUNT) => {
  const [recentGoodsList, _setRecentGoodsList] = useRecoilState(recentlyGoodsState);

  const setRecentGoodsList = useCallback(
    (goodsList: DetailGoods[]) => {
      const newGoodsList = makeUniqueDetailGoodsList(goodsList.slice(0, max - 1));
      localStorage.setItem(RECENT_GOODS_STORAGE_KEY, JSON.stringify(newGoodsList));
      _setRecentGoodsList(newGoodsList);
    },
    [_setRecentGoodsList]
  );

  return [recentGoodsList, setRecentGoodsList];
};

export default useRecentGoodsHistory;
