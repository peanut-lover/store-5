import { DetailGoods, MainGoodsListResult, ThumbnailGoods } from '@src/types/Goods';
import { APIResponse, checkedFetch } from './base';
interface GoodsByCategoryResult {
  goodsList: ThumbnailGoods[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
}

export interface GetGoodsByCategoryProps {
  categoryName: string;
  page: number;
  flag: string;
  limit?: number;
}

export interface GetGoodsByKeywordProps {
  keyword: string;
  page: number;
}

// TODO: 상품 수가 충분해지면 페이지당 상품 수 조정
const LIMIT = 5;

export const getGoodsByCategory = async ({
  categoryName,
  page,
  flag,
  limit = LIMIT,
}: GetGoodsByCategoryProps): Promise<APIResponse<GoodsByCategoryResult>> => {
  const res = await checkedFetch(
    `/api/goods/category?category=${categoryName}&page=${page}&flag=${flag}&limit=${limit}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  return await res.json();
};

export const getGoodsByKeyword = async ({
  keyword,
  page,
}: GetGoodsByKeywordProps): Promise<APIResponse<GoodsByCategoryResult>> => {
  const res = await checkedFetch(`/api/goods/keyword?keyword=${keyword}&page=${page}&limit=${LIMIT}`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const getMainGoodsListMap = async (): Promise<APIResponse<MainGoodsListResult>> => {
  const res = await checkedFetch(`/api/goods/main`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const getGoodsDetail = async (goodsId: number): Promise<APIResponse<DetailGoods>> => {
  const res = await checkedFetch(`/api/goods/${goodsId}`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const getGoodsStockCount = async (goodsId: number): Promise<APIResponse<number>> => {
  const res = await checkedFetch(`/api/goods/${goodsId}/stock`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

// 같은 카테고리인 상품을 4개까지 가져옴
export const getRelationGoods = async (categoryName: string): Promise<APIResponse<GoodsByCategoryResult>> => {
  const RELATION_LIMIT = 4;
  const res = await checkedFetch(`/api/goods/category?category=${categoryName}&limit=${RELATION_LIMIT}`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};
