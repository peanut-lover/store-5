import { Request } from 'express';
import { OrderGoods } from '../Order';

export interface CreateOrder {
  orderMemo: string;
  receiver: string;
  zipCode: string;
  address: string;
  subAddress: string;
  paymentId: number;
  cartIds?: number[];
}

export interface CreateOrderBody extends CreateOrder {
  goodsList: OrderGoods[];
}

export interface CreateOrderRequest extends Request {
  body: CreateOrderBody;
}
