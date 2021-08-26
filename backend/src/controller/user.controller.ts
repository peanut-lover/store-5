import { UserAddressService } from '../service/user.address.service';
import { Request, Response } from 'express';
import { CreateAddressRequest } from '../types/request/user.request';
import { GoodsService } from '../service/goods.service';

async function getAddressById(req: Request, res: Response) {
  const userId = req.userId;
  const addressId = Number(req.params.id);
  const result = await UserAddressService.getAddressById(userId, addressId);
  res.status(200).json({ result });
}

async function getAddresses(req: Request, res: Response) {
  const userId = req.userId;
  const result = await UserAddressService.getAddresses(userId);
  res.status(200).json({ result });
}

async function createAddress(req: CreateAddressRequest, res: Response) {
  const userId = req.userId;
  const result = await UserAddressService.createAddress(userId, req.body);
  res.status(201).json({ result });
}

async function deleteAddress(req: Request, res: Response) {
  const userId = req.userId;
  const addressId = Number(req.params.id);
  await UserAddressService.deleteAddress(userId, addressId);
  res.sendStatus(204);
}

async function updateAddress(req: CreateAddressRequest, res: Response) {
  const userId = req.userId;
  const addressId = Number(req.params.id);
  await UserAddressService.updateAddress(userId, addressId, req.body);
  res.status(200).json({
    result: {
      id: addressId,
    },
  });
}

async function getWishGoods(req: Request, res: Response) {
  const { page, limit } = req.query;

  const pageAsNumber = Number(page);
  const limitAsNumber = Number(limit);

  const result = await GoodsService.getAllGoodsByUserId(pageAsNumber, limitAsNumber, req.userId);

  res.status(200).json({
    result,
  });
}

export const UserController = {
  getAddressById,
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
  getWishGoods,
};
