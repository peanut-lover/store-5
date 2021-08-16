import { Goods } from '../entity/Goods';

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
  category: number;
  page: number;
  flag: 'best' | 'low' | 'high';
  limit: number;
  // 'S' = 판매중, 'T' = 임시, 'D' = 삭제
  state: 'S' | 'T' | 'D';
  // 비회원 undefined
  userId?: number;
}
