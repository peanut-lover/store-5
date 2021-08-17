import { Request } from 'express';

export interface CartBody {
  amount: number;
}

export type CreateCartBody = CartBody & {
  goodsId: number;
};

export interface CreateCartRequest extends Request {
  body: CreateCartBody;
}

export interface UpdateCartRequest extends Request {
  body: CartBody;
}
