import { Goods } from '../entity/Goods';
import { PaginationProps } from './Pagination';

// 'S' = 판매중, 'T' = 임시, 'D' = 삭제
export type GoodsState = 'S' | 'T' | 'D';

export type FindAllProps = PaginationProps & {
  stock: number;
  order: keyof Goods;
  sort: 'ASC' | 'DESC';
  // 비회원 undefined
  userId?: number;
  category?: number;
  state?: GoodsState | null;
  title?: string;
};

export type FindTotalCountProps = {
  stock: number;
  state?: GoodsState | null;
  title?: string;
  category?: number;
};
