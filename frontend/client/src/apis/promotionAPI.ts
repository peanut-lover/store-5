import { Promotion } from '@src/types/Promotion';
import { APIResponse, checkedFetch } from './base';

export const getPromotions = async (): Promise<APIResponse<Promotion[]>> => {
  const res = await checkedFetch(`/api/promotion`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};
