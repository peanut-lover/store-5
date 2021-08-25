import { GoodsItem } from './../types/Goods';
import { APIResponse, checkedFetch } from '@src/apis/base';
import { CreatedGoods, GetGoodsByOptionProps, GoodsPaginationResult } from '@src/types/Goods';
import { GoodsImg } from '@src/types/GoodsImg';

const createGoods = async (formData: FormData): Promise<APIResponse<CreatedGoods>> => {
  const res = await checkedFetch(`/api/goods`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return await res.json();
};

const updateGoods = async (formData: FormData, goodsId: number): Promise<APIResponse<CreatedGoods>> => {
  const res = await checkedFetch(`/api/goods/${goodsId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });
  return await res.json();
};

const DEFAULT_LIMIT = 10;

export const getGoodsByOption = async (option: GetGoodsByOptionProps): Promise<APIResponse<GoodsPaginationResult>> => {
  const res = await checkedFetch(getGoodsOptionURL(option), {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

const getGoodsImgById = async (goodsId: number): Promise<APIResponse<GoodsImg[]>> => {
  const res = await checkedFetch(`/api/goods/${goodsId}/img`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

const getBestSellingGoodsForDashboard = async (): Promise<APIResponse<GoodsItem[]>> => {
  const res = await checkedFetch(`/api/goods/dashboard/best`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

const deleteGoods = async (goodsId: number): Promise<APIResponse<CreatedGoods>> => {
  const res = await checkedFetch(`/api/goods/${goodsId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return await res.json();
};

const getGoodsOptionURL = ({
  page,
  limit = DEFAULT_LIMIT,
  keyword = '',
  flag = 'create',
  sort = 'DESC',
}: GetGoodsByOptionProps): string => {
  const keywordQuery = keyword ? `&keyword=${keyword}` : '';
  const flagQuery = flag ? `&flag=${flag}` : '';
  const sortQuery = sort ? `&sort=${sort}` : '';
  return `/api/goods/admin?page=${page}&limit=${limit}${keywordQuery + flagQuery + sortQuery}`;
};

export const GoodsAPI = {
  createGoods,
  updateGoods,
  getGoodsByOption,
  getGoodsImgById,
  getBestSellingGoodsForDashboard,
  deleteGoods,
};
