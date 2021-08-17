import { DeleteResult } from 'typeorm';
import { INVALID_ACCESS } from '../constants/client-error-name';
import { NotFoundError } from '../errors/client.error';
import CartRepository from '../repository/cart.repository';
import { GoodsRepository } from '../repository/goods.repository';
import { CartBody } from '../types/request/cart.request';
import { CartResponse, CartsResponse } from '../types/response/cart.response';

async function getAllCartByUserId(userId: number): Promise<CartsResponse> {
  return await CartRepository.getCartsByUserId(userId);
}

async function createCart(userId: number, goodsId: number, body: CartBody): Promise<CartResponse> {
  // goods가 존재하는지 체크한다.
  const goods = await GoodsRepository.findGoodsDetailById(goodsId);
  if (!goods) throw new NotFoundError(INVALID_ACCESS);

  return await CartRepository.createCart(userId, goodsId, body);
}

async function updateCart(userId: number, cartId: number, body: CartBody): Promise<CartResponse> {
  await checkMineCart(userId, cartId);
  return await CartRepository.updateCart(cartId, body);
}

async function deleteCarts(userId: number, cartIds: number[]) {
  async function getDeletePromise(cartId: number) {
    await checkMineCart(userId, cartId);
    await CartRepository.deleteCart(cartId);
  }

  await Promise.all(cartIds.map((cartId) => getDeletePromise(cartId)));
}

async function checkMineCart(userId: number, cartId: number): Promise<boolean> {
  const cart = await CartRepository.getCartByUserIdAndCartId(userId, cartId);
  if (cart) return true;
  throw new NotFoundError(INVALID_ACCESS);
}

const CartService = {
  getAllCartByUserId,
  createCart,
  updateCart,
  deleteCarts,
};

export default CartService;
