import { CartGoods } from '@src/types/Goods';
import { APIResponse, checkedFetch } from './base';

interface CartsResponse {
  carts: CartGoods[];
}

interface CartResponse {
  cart: CartGoods;
}

export interface CartBody {
  amount: number;
}

export type CreateCartBody = CartBody & {
  goodsId: number;
};

export const getCarts = async (): Promise<APIResponse<CartsResponse>> => {
  const res = await checkedFetch(`/api/cart`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const createCart = async (cart: CreateCartBody): Promise<APIResponse<CartResponse>> => {
  const res = await checkedFetch(`/api/cart`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(cart),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const updateCart = async (cartId: number, cart: CartBody): Promise<APIResponse<CartResponse>> => {
  const res = await checkedFetch(`/api/cart/${cartId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify(cart),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const deleteCarts = async (cartIds: number[]): Promise<APIResponse> => {
  const res = await checkedFetch(`/api/category?id=${cartIds.join(',')}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return await res.json();
};
