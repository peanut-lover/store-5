import { DeleteResult, getRepository } from 'typeorm';
import { CART_DB_ERROR } from '../constants/database-error-name';
import { Cart } from '../entity/Cart';
import { DatabaseError } from '../errors/base.error';
import { CartBody } from '../types/request/cart.request';

async function getCartByUserIdAndCartId(userId: number, cartId: number): Promise<Cart | undefined> {
  try {
    const cartRepo = getRepository(Cart);
    return await cartRepo.findOne({ where: { id: cartId, user: userId } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CART_DB_ERROR);
  }
}

async function getCartsByUserId(userId: number): Promise<Cart[]> {
  try {
    const cartRepo = getRepository(Cart);
    return await cartRepo.find({ where: { user: userId } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CART_DB_ERROR);
  }
}

async function createCart(userId: number, goodsId: number, body: CartBody): Promise<Cart> {
  try {
    const cartRepo = getRepository(Cart);
    return await cartRepo.save({ user: { id: userId }, goods: { id: goodsId }, ...body });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CART_DB_ERROR);
  }
}

async function updateCart(cartId: number, body: CartBody): Promise<Cart> {
  try {
    const cartRepo = getRepository(Cart);
    return await cartRepo.save({ id: cartId, ...body });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CART_DB_ERROR);
  }
}

async function deleteCart(cartId: number): Promise<DeleteResult> {
  try {
    const cartRepo = getRepository(Cart);
    return await cartRepo.delete({ id: cartId });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CART_DB_ERROR);
  }
}

const CartRepository = { getCartByUserIdAndCartId, getCartsByUserId, createCart, updateCart, deleteCart };

export default CartRepository;
