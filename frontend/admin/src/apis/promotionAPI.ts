import { APIResponse, checkedFetch } from '@src/apis/base';
import { Promotion } from '@src/types/Promotion';

const createPromotion = async (formData: FormData): Promise<APIResponse<Promotion>> => {
  const res = await checkedFetch(`/api/promotion`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return res.json();
};

const getPromotions = async (): Promise<APIResponse<Promotion[]>> => {
  const res = await checkedFetch(`/api/promotion`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

const PromotionAPI = {
  createPromotion,
  getPromotions,
};

export default PromotionAPI;
