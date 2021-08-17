import { APIResponse, checkedFetch } from '@src/apis/base';
import { AddressInfo } from '@src/types/Address';

const getAddresses = async (): Promise<APIResponse<AddressInfo[]>> => {
  const res = await checkedFetch(`/api/user/address`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const AddressAPI = {
  getAddresses,
};
