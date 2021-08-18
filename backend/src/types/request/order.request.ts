import { Request } from 'express';
import { OrderGoods } from '../Order';

export interface CreateOrderBody {
  state: string;
  orderMemo: string;
  receiver: string;
  zipCode: string;
  address: string;
  goodsList: OrderGoods[];
  subAddress: string;
  paymentId: number;
}

export interface CreateOrderRequest extends Request {
  body: CreateOrderBody;
}
