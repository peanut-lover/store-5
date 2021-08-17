import { Request } from 'express';
export interface CreateGoodsBody {
  title: string;
  category: number;
  isGreen: boolean;
  price: number;
  stock: number;
  state: string;
  discountRate: number;
  deliveryInfoId: number;
}

export interface CreateGoodsRequest extends Request {
  body: CreateGoodsBody;
}
