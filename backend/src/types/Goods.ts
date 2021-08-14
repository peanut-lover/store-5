import { Goods } from '../entity/Goods';

export interface FindAllCategoryProps {
  category: number;
  offset: number;
  limit: number;
  order: keyof Goods;
  sort: 'ASC' | 'DSC';
}
