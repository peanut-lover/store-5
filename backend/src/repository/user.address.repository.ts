import { USER_ADDRESS_DB_ERROR } from './../constants/database-error-name';
import { DatabaseError } from './../errors/base.error';
import { AddressBody } from './../types/request/auth.request';
import { UserAddress } from './../entity/UserAddress';
import { getConnection, getRepository } from 'typeorm';

async function getAddressByIds(userId: number, addressId: number): Promise<UserAddress | undefined> {
  try {
    const addressRepo = getRepository(UserAddress);
    return await addressRepo.findOne({ where: { id: addressId, user: userId } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function getAddressesById(id: number) {
  try {
    const addressRepo = getRepository(UserAddress);
    return await addressRepo.find({});
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function createAddress(id: number, body: AddressBody) {
  try {
    const addressRepo = getRepository(UserAddress);
    const address = await addressRepo.create({ user: id, ...body });
    const result = await addressRepo.insert(address);
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

async function deleteAddress(id: number) {
  try {
    const addressRepo = getRepository(UserAddress);
    return await addressRepo.delete({ id });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function updateAddress() {}

export const UserAddressRepository = {
  getAddressByIds,
  getAddressesById,
  createAddress,
  createDefaultAddress,
  deleteAddress,
  updateAddress,
};
