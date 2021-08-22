import { Goods } from '../entity/Goods';
import { PaginationProps } from './Pagination';

// 'S' = 판매중, 'T' = 임시, 'D' = 삭제
export type GoodsState = 'S' | 'T' | 'D';

// 'best' = 인기, 'low' = 낮은 가격, 'high' = 높은 가격, 'latest' = 최신순
export type GoodsFlag = 'best' | 'low' | 'high' | 'latest';

export type FindAllProps = PaginationProps & {
  // 비회원 undefined
  userId?: number;
  category?: number;
  keyword?: string;
  order?: keyof Goods;
  state?: GoodsState;
  sort: 'ASC' | 'DESC';
};
