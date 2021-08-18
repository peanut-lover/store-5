import { APIResponse, checkedFetch } from '@src/apis/base';

// :Promise<APIResponse<Goods>>
const createGoods = async (formData: FormData) => {
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
