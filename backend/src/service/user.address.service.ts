import { INVALID_ACCESS } from '../constants/client-error-name';
import { NotFoundError } from '../errors/client.error';
import { UserAddressRepository } from '../repository/user.address.repository';
import { AddressBody } from '../types/request/user.request';

async function getAddresses(userId: number) {
  return await UserAddressRepository.getAddressesById(userId);
}

async function createAddress(userId: number, body: AddressBody) {
  if (body.isDefault) {
    return await UserAddressRepository.createDefaultAddress(userId, body);
  }
  return await UserAddressRepository.createAddress(userId, body);
}

async function deleteAddress(userId: number, addressId: number) {
  await isMineAddress(userId, addressId);
  return await UserAddressRepository.deleteAddress(addressId);
}

async function updateAddress(userId: number, addressId: number, body: AddressBody) {
  if (body.isDefault) {
    return await UserAddressRepository.updateDefaultAddress(userId, addressId, body);
  }
  return await UserAddressRepository.updateAddress(userId, addressId, body);
}

async function isMineAddress(userId: number, addressId: number): Promise<boolean> {
  const address = await UserAddressRepository.getAddressByIds(userId, addressId);
  if (address) return true;
  throw new NotFoundError(INVALID_ACCESS);
}

export const UserAddressService = {
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
};
