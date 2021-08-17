import { Request, Response } from 'express';
import CartService from '../service/cart.service';
import { CreateCartRequest, UpdateCartRequest } from '../types/request/cart.request';

async function getAllCart(req: Request, res: Response) {
  const userId = req.userId;
  const result = await CartService.getAllCartByUserId(userId);
  res.status(200).json({ result });
}

async function createCart(req: CreateCartRequest, res: Response) {
  const userId = req.userId;
  const { goodsId } = req.body;
  const result = await CartService.createCart(userId, goodsId, req.body);
  res.status(201).json({ result });
}

async function updateCart(req: UpdateCartRequest, res: Response) {
  const userId = req.userId;
  const cartId = Number(req.params.id);
  const result = await CartService.updateCart(userId, cartId, req.body);
  res.status(200).json({ result });
}

async function deleteCart(req: Request, res: Response) {
  const userId = req.userId;
  const cartId = Number(req.params.id);
  await CartService.deleteCart(userId, cartId);
  res.sendStatus(204);
}

const CartController = {
  getAllCart,
  createCart,
  updateCart,
  deleteCart,
};

export default CartController;
