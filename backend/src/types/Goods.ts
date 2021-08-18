import { Goods } from '../entity/Goods';

// 'S' = 판매중, 'T' = 임시, 'D' = 삭제
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

export interface FindAllColumnNameProps {
  columnName: keyof Goods;
  limit: number;
}

export interface FindAllKeywordProps {
  keyword: string;
  offset: number;
  limit: number;
}

export interface FindAllUserIdProps {
  userId: number;
  offset: number;
  limit: number;
}

export interface GetAllByCategoryProps {
  // 카테고리 명
  categoryName: string;
  page: number;
  flag: GoodsFlag;
  limit: number;
  state: GoodsState;
  // 비회원 undefined
  userId?: number;
}

export interface GetAllByKeywordProps {
  // 카테고리 명
  keyword: string;
  page: number;
  limit: number;
  state: GoodsState;
  // 비회원 undefined
  userId?: number;
}

export interface GetAllByUserIdProps {
  page: number;
  limit: number;
  userId: number;
}
