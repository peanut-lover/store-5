import { Goods } from '../entity/Goods';

export interface FindAllCategoryProps {
  category: number;
  offset: number;
  where?: object;
  userId?: number;
  limit: number;
  order: keyof Goods;
  sort: 'ASC' | 'DESC';
}

export interface GetAllByCategoryProps {
  category: number;
  page: number;
  flag: string;
  limit: number;
  state: string;
  userId?: number;
}
