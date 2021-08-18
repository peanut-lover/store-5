import { APIResponse, checkedFetch } from '@src/apis/base';
import { CreatedGoods } from '@src/types/Goods';

const createGoods = async (formData: FormData): Promise<APIResponse<CreatedGoods>> => {
  const res = await checkedFetch(`/api/goods`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return await res.json();
};

export const GoodsAPI = {
  createGoods,
};
