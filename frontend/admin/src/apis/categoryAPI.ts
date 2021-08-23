import { Category } from '@src/types/Category';
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

const getParentCategoryCount = async (): Promise<APIResponse<PieChartData>> => {
  const res = await checkedFetch(`/api/category/admin/dashboard`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

const CategoryAPI = {
  getAllCategory,
  getParentCategoryCount,
};

export default CategoryAPI;
