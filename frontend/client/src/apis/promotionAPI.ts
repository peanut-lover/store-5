import { Promotion } from '@src/types/Promotion';
import { APIResponse, checkedFetch } from './base';

const getPromotions = async (): Promise<APIResponse<Promotion[]>> => {
  const res = await checkedFetch(`/api/promotion`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

// 결과를 반환할 필요가 없으므로 return void
const increasePromotionView = async (promotionId: number): Promise<void> => {
  await checkedFetch(`/api/promotion/${promotionId}`, {
    method: 'PATCH',
    credentials: 'include',
  });
};

const PromotionAPI = {
  getPromotions,
  increasePromotionView,
};

export default PromotionAPI;
