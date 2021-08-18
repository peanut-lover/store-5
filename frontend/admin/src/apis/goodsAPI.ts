import { APIResponse, checkedFetch } from '@src/apis/base';

const createGoods = async (formData: FormData) => {
  console.log(formData);
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
