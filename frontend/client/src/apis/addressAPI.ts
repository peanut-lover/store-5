import { APIResponse, checkedFetch } from '@src/apis/base';
import { AddressCore, AddressInfo, AddressUpdateResult } from '@src/types/Address';

const getAddresses = async (): Promise<APIResponse<AddressInfo[]>> => {
  const res = await checkedFetch(`/api/user/address`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

const getAddressById = async (addressId: number): Promise<APIResponse<AddressInfo>> => {
  const res = await checkedFetch(`/api/user/address/${addressId}`, {
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

const updateAddress = async (addressId: number, address: AddressCore): Promise<APIResponse<AddressUpdateResult>> => {
  const res = await checkedFetch(`/api/user/address/${addressId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(address),
  });
  return await res.json();
};

const deleteAddress = async (addressId: number): Promise<boolean> => {
  await checkedFetch(`/api/user/address/${addressId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  // No Exception is Success!
  return true;
};

export const AddressAPI = {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
