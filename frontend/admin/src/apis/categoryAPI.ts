import { BestSelledCategory, Category, CategoryView, CategoryWithParent } from '@src/types/Category';
import { PieChartData } from '@src/types/Chart';
import { APIResponse, checkedFetch } from './base';
interface CategoryResponse {
  categories: Category[];
}
const getAllCategory = async (): Promise<APIResponse<CategoryResponse>> => {
  const res = await checkedFetch(`/api/category`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

const getCategoryGoodsCounts = async (): Promise<APIResponse<PieChartData>> => {
  const res = await checkedFetch(`/api/category/dashboard/count`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

const getBestSellingCategory = async (): Promise<APIResponse<BestSelledCategory[]>> => {
  const res = await checkedFetch(`/api/category/dashboard/sell`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

const getCategoriesView = async (): Promise<APIResponse<CategoryView[]>> => {
  const res = await checkedFetch(`/api/category/dashboard/view`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

const getCategoryByGoodsId = async (goodsId: number): Promise<APIResponse<CategoryWithParent>> => {
  const res = await checkedFetch(`/api/category/goods/${goodsId}`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

const CategoryAPI = {
  getAllCategory,
  getCategoryGoodsCounts,
  getBestSellingCategory,
  getCategoriesView,
  getCategoryByGoodsId,
};

export default CategoryAPI;
