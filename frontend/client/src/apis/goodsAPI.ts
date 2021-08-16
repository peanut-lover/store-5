import { MainGoodsListResult, ThumbnailGoods } from '@src/types/Goods';
import { APIResponse, checkedFetch } from './base';
interface GoodsByCategoryResult {
  goods: ThumbnailGoods[];
}

const GoodsFlag = {
  best: 'best',
  low: 'low',
  high: 'high',
  latest: 'latest',
};

const LIMIT = 5;

export const getGoodsByCategory = async (
  categoryName: string,
  page: number = 1,
  flag: string = GoodsFlag.latest
): Promise<APIResponse<GoodsByCategoryResult>> => {
  const res = await checkedFetch(`/api/goods/category/${categoryName}?page=${page}&flag=${flag}&limit=${LIMIT}`, {
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
/*
// TODO: API 연동시 제거할 코드들
const mockProductImagePath =
  'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg';
const mock_new_products: ThumbnailGoods[] = [
  {
    id: 1,
    thumbnailImg: mockProductImagePath,
    title: '맥쥬짠',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    discountRate: 0,
  },
  {
    id: 2,
    thumbnailImg: mockProductImagePath,
    title: '맥쥬짠',
    price: 10000,
    isNew: true,
    isSale: true,
    discountRate: 20,
  },
  {
    id: 3,
    thumbnailImg: mockProductImagePath,
    title: '맥쥬짠',
    price: 10000,
    isNew: true,
    isSale: true,
    discountRate: 20,
  },
  { id: 4, thumbnailImg: mockProductImagePath, title: '맥쥬짠', price: 10000, isNew: true, discountRate: 0 },
  { id: 5, thumbnailImg: mockProductImagePath, title: '맥쥬짠', price: 10000, isNew: true, discountRate: 0 },
  { id: 6, thumbnailImg: mockProductImagePath, title: '맥쥬짠', price: 10000, isNew: true, discountRate: 0 },
  { id: 7, thumbnailImg: mockProductImagePath, title: '맥쥬짠', price: 10000, isNew: true, discountRate: 0 },
  { id: 8, thumbnailImg: mockProductImagePath, title: '맥쥬짠', price: 10000, isNew: true, discountRate: 0 },
];

*/
