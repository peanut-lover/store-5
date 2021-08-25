import { Request } from 'express';
export interface CreateReviewBody {
  goodsId: number;
  rate: number;
  contents: string;
}

export interface UpdateReviewBody {
  goodsId: number;
  rate: number;
  contents: string;
  deletedImages: string[];
}

export interface CreateReviewRequest extends Request {
  body: CreateReviewBody;
}

export interface UpdateReviewRequest extends Request {
  body: UpdateReviewBody;
}
