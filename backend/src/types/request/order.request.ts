import { Request } from 'express';
import { OrderGoods } from '../Order';

export interface CreateOrder {
  state: string;
  orderMemo: string;
  receiver: string;
  zipCode: string;
  address: string;
  subAddress: string;
  paymentId: number;
}

export interface CreateOrderBody extends CreateOrder {
  goodsList: OrderGoods[];
}

export interface CreateOrderRequest extends Request {
  body: CreateOrderBody;
}
