import { Goods } from '../entity/Goods';

export interface FindAllCategoryProps {
  category: number;
  offset: number;
  where?: object;
  limit: number;
  order: keyof Goods;
  sort: 'ASC' | 'DSC';
}
