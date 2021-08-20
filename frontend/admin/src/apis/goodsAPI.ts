import { APIResponse, checkedFetch } from '@src/apis/base';
import { CreatedGoods, GetGoodsByOptionProps, GoodsPaginationResult } from '@src/types/Goods';

const createGoods = async (formData: FormData): Promise<APIResponse<CreatedGoods>> => {
  const res = await checkedFetch(`/api/goods`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return await res.json();
};

const DEFAULT_LIMIT = 10;

export const getGoodsByOption = async ({
  page,
  limit = DEFAULT_LIMIT,
  keyword = '',
  order,
  sort,
}: GetGoodsByOptionProps): Promise<APIResponse<GoodsPaginationResult>> => {
  const res = await checkedFetch(
    `/api/goods/admin?page=${page}&limit=${limit}
    ${keyword ? `&keyword=${keyword}` : ''}
    ${order ? `&order=${order}` : ''}
    ${sort ? `&sort=${sort}` : ''}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  const json = await res.json();
  console.log(json);
  return json;
  // return await res.json();
};

export const GoodsAPI = {
  createGoods,
  getGoodsByOption,
};
