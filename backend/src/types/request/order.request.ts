import { Request } from 'express';
export interface CreateOrderBody {
  state: string;
  orderMemo: string;
  receiver: string;
  zipCode: string;
  address: string;
  subAddress: string;
  payment: {
    id: number;
  };
}

export interface CreateOrderRequest extends Request {
  body: CreateOrderBody;
}
