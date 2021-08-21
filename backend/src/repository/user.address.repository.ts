import { USER_ADDRESS_DB_ERROR } from './../constants/database-error-name';
import { DatabaseError } from './../errors/base.error';
import { UserAddress } from './../entity/UserAddress';
import { DeleteResult, getConnection, getRepository, UpdateResult } from 'typeorm';
import { AddressBody } from '../types/request/user.request';

async function getAddressByIds(userId: number, addressId: number): Promise<UserAddress | undefined> {
  try {
    const addressRepo = getRepository(UserAddress);
    return await addressRepo.findOne({ where: { id: addressId, user: { id: userId } } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function getAddressesById(userId: number): Promise<UserAddress[]> {
  try {
    const addressRepo = getRepository(UserAddress);
    return await addressRepo.find({
      where: {
        user: { id: userId },
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function createAddress(userId: number, body: AddressBody): Promise<UserAddress> {
  try {
    const addressRepo = getRepository(UserAddress);
    const address = await addressRepo.save({ user: { id: userId }, ...body });
    return address;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function createDefaultAddress(userId: number, body: AddressBody): Promise<UserAddress> {
  try {
    return await getConnection().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(
        UserAddress,
        { user: { id: userId }, isDefault: true },
        { isDefault: false }
      );
      return await transactionalEntityManager.save(UserAddress, { ...body, user: { id: userId } });
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function deleteAddress(id: number): Promise<DeleteResult> {
  try {
    const addressRepo = getRepository(UserAddress);
    return await addressRepo.delete({ id });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function updateAddress(userId: number, addressId: number, body: AddressBody): Promise<UpdateResult> {
  try {
    const addressRepo = getRepository(UserAddress);
    return await addressRepo.update({ id: addressId, user: { id: userId } }, { ...body });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function updateDefaultAddress(userId: number, addressId: number, body: AddressBody): Promise<UpdateResult> {
  try {
    return getConnection().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(
        UserAddress,
        { user: { id: userId }, isDefault: true },
        { isDefault: false }
      );
      return await transactionalEntityManager.update(UserAddress, { id: addressId, user: { id: userId } }, { ...body });
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

export const UserAddressRepository = {
  getAddressByIds,
  getAddressesById,
  createAddress,
  createDefaultAddress,
  deleteAddress,
  updateAddress,
  updateDefaultAddress,
};
