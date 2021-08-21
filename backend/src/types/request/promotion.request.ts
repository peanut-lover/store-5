import { Request } from 'express';
export interface CreatePromotionBody {
  // TODO: add goods ID
}

export interface CreatePromotionRequest extends Request {
  body: CreatePromotionBody;
}
