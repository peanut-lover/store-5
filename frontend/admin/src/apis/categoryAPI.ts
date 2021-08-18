import { Category } from '@src/types/Category';
import { APIResponse, checkedFetch } from './base';
interface CategoryResponse {
  categories: Category[];
}
const getAllCategory = async (): Promise<APIResponse<CategoryResponse>> => {
  const res = await checkedFetch(`/api/category`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const CategoryAPI = {
  getAllCategory,
};
