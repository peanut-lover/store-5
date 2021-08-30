import { Request } from 'express';
export interface CreateGoodsBody {
  title: string;
  category: number;
  isGreen: boolean;
  price: number;
  stock: number;
  state: string;
  discountRate: number;
  deliveryInfo: number;
}

export type UpdateGoodsBody = CreateGoodsBody & {
  oldImages?: string;
  thumbnailUrl?: string;
};

type CreateGoodsRequestBody = CreateGoodsBody & {
  isGreen: 'true' | 'false';
};

type UpdateGoodsRequestBody = UpdateGoodsBody & {
  isGreen: 'true' | 'false';
};

export interface CreateGoodsRequest extends Request {
  body: CreateGoodsRequestBody;
}

export interface UpdateGoodsRequest extends Request {
  body: UpdateGoodsRequestBody;
}

export type GetAllGoodsQuery = {
  page: number;
  limit: number;
  sort: string;
  category?: string;
  flag?: string;
  keyword?: string;
};
