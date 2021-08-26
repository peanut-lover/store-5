import { Request, Response } from 'express';
import { BadRequestError } from '../errors/client.error';
import CartService from '../service/cart.service';
import { CreateCartRequest, UpdateCartRequest } from '../types/request/cart.request';

async function getAllCart(req: Request, res: Response) {
  const userId = req.userId;
  const result = await CartService.getAllCartByUserId(userId);
  res.status(200).json({ result });
}

async function createCart(req: CreateCartRequest, res: Response) {
  const userId = req.userId;
  const goodsId = Number(req.body.goodsId);
  if (isNaN(goodsId)) {
    throw new BadRequestError('goodsId should be number');
  }
  const result = await CartService.createCart(userId, goodsId, req.body);
  res.status(201).json({ result });
}

async function updateCart(req: UpdateCartRequest, res: Response) {
  const userId = req.userId;
  const cartId = Number(req.params.id);
  const result = await CartService.updateCart(userId, cartId, req.body);
  res.status(200).json({ result });
}

async function deleteCarts(req: Request, res: Response) {
  const userId = req.userId;
  if (!req.query.id) {
    throw new BadRequestError('id query param should be exist');
  }
  const cartIds = (req.query.id as string)
    .split(',')
    .map((id) => Number(id))
    .filter((id) => !isNaN(id));
  await CartService.deleteCarts(userId, cartIds);
  res.sendStatus(204);
}

const CartController = {
  getAllCart,
  createCart,
  updateCart,
  deleteCarts,
};

export default CartController;
