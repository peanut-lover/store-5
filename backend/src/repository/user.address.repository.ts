import { USER_ADDRESS_DB_ERROR } from './../constants/database-error-name';
import { DatabaseError } from './../errors/base.error';
import { AddressBody } from './../types/request/auth.request';
import { UserAddress } from './../entity/UserAddress';
import { getConnection, getRepository } from 'typeorm';

async function getAddressesById(id: number) {
  try {
    const userRepo = getRepository(UserAddress);
    const result = await userRepo.find({});
    return result;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function createAddress(id: number, body: AddressBody) {
  try {
    const userRepo = getRepository(UserAddress);
    const address = await userRepo.create({ user: id, ...body });
    const result = await userRepo.insert(address);
    return result;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function createDefaultAddress(id: number, body: AddressBody) {
  try {
    getConnection().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(UserAddress, { user: id, isDefault: true }, { isDefault: false });
      const result = await transactionalEntityManager.save(UserAddress, { ...body, user: id });
      return result;
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

// async function deleteAddress(params: type) {}

// async function updateAddress(params: type) {}

export const UserAddressRepository = {
  getAddressesById,
  createAddress,
  createDefaultAddress,
};
