import { Request } from 'express';
export interface CreateReviewBody {
  goodsId: number;
  rate: number;
  contents: string;
}

export interface CreateReviewRequest extends Request {
  body: CreateReviewBody;
}
