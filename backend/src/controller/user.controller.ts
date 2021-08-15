import { UserAddressService } from '../service/user.address.service';
import { Request, Response } from 'express';
import { CreateAddressRequest } from '../types/request/auth.request';

async function getAddresses(req: Request, res: Response) {
  const userId = req.userId;
  const result = await UserAddressService.getAddresses(userId);
  res.status(200).json(result);
}

async function createAddress(req: CreateAddressRequest, res: Response) {
  const userId = req.userId;
  const result = await UserAddressService.createAddress(userId, req.body);
  res.status(200).json(result);
}

async function deleteAddress(req: Request, res: Response) {
  const userId = req.userId;
  const addressId = +req.params.id;
  await UserAddressService.deleteAddress(userId, addressId);
  res.sendStatus(204);
}

async function updateAddress(req: CreateAddressRequest, res: Response) {
  const userId = req.userId;
  const addressId = +req.params.id;
  await UserAddressService.updateAddress(userId, addressId, req.body);
  res.sendStatus(200);
}

export const UserController = {
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
};
