import { Request } from 'express';
export interface CreatePromotionBody {
  imgUrl: string;
}

export interface CreatePromotionRequest extends Request {
  body: CreatePromotionBody;
}
