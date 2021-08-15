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
  category: string;
  page: string;
  flag: string;
  limit: string;
  state: string;
  userId: number;
}
