import { APIResponse, checkedFetch } from './base';

export const postWish = async (goodsId: number): Promise<boolean> => {
  const res = await checkedFetch(`/api/wish/goods/${goodsId}`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.ok;
};

export const deleteWish = async (goodsId: number): Promise<boolean> => {
  const res = await checkedFetch(`/api/wish/goods/${goodsId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.ok;
};
