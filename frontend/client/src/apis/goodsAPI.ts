import { MainGoodsListResult, ThumbnailGoods } from '@src/types/Goods';
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
}: GetGoodsByCategoryProps): Promise<APIResponse<GoodsByCategoryResult>> => {
  const res = await checkedFetch(
    `/api/goods/category?category=${categoryName}&page=${page}&flag=${flag}&limit=${LIMIT}`,
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
