import { Goods } from '../entity/Goods';

export type GoodsState = 'S' | 'T' | 'D';

export type GoodsFlag = 'best' | 'low' | 'high' | 'latest';

export interface FindAllCategoryProps {
  category: number;
  offset: number;
  // TODO 회의 후 타입 결정
  where?: object;
  userId?: number;
  limit: number;
  order: keyof Goods;
  sort: 'ASC' | 'DESC';
}

export interface GetAllByCategoryProps {
  // 카테고리 명
  categoryName: string;
  page: number;
  flag: GoodsFlag;
  limit: number;
  // 'S' = 판매중, 'T' = 임시, 'D' = 삭제
  state: GoodsState;
  // 비회원 undefined
  userId?: number;
}
