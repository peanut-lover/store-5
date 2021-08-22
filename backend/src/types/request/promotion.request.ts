import { Request } from 'express';
export interface CreatePromotionBody {
  // TODO: add goods ID
  goodsId: number;
}

export interface CreatePromotionRequest extends Request {
  body: CreatePromotionBody;
}
