import { Review } from './../entity/Review';

export interface getReviewsOption {
  limit: number;
  page: number;
  goodsId?: number;
  userId?: number;
  requestUserId?: number;
}

export interface ReviewWithIsMine extends Review {
  isMine: boolean;
}

export interface getReviewsResult {
  reviews: ReviewWithIsMine[];
  meta: {
    totalCount: number;
  };
}
