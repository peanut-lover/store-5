import { Request } from 'express';
export interface CreateGoodsRequest extends Request {
  title: string;
  category: number;
  // file binary 타입 정의,
  isGreen: boolean;
  price: number;
  stock: number;
  state: string;
  discountRate: number;
}
