import { APIResponse, checkedFetch } from '@src/apis/base';
import { AddressCore, AddressInfo } from '@src/types/Address';

const getAddresses = async (): Promise<APIResponse<AddressInfo[]>> => {
  const res = await checkedFetch(`/api/user/address`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

const createAddress = async (address: AddressCore): Promise<APIResponse<AddressInfo>> => {
  const res = await checkedFetch(`/api/user/address`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(address),
  });
  return await res.json();
};

export const AddressAPI = {
  getAddresses,
  createAddress,
};
