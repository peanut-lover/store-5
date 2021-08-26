import { APIResponse, checkedFetch } from '@src/apis/base';
import { DeliveryInfo } from '@src/types/DeliveryInfo';

const getDeliveryInfos = async (): Promise<APIResponse<DeliveryInfo[]>> => {
  const res = await checkedFetch(`/api/delivery`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const DeliveryAPI = {
  getDeliveryInfos,
};
