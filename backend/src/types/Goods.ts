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

// interface PageProps {
//   page: number;
//   limit: number;
//   userId?: number;
// }

// export type GetAllByCategoryProps = PageProps & {
//   flag?: string;
//   category?: number;
//   state?: string;
// };

// export type GetAllByKeywordProps = PageProps & {
//   keyword: string;
// };

export interface GetAllByCategoryProps {
  category: string;
  page: string;
  flag: string;
  limit: string;
  state: string;
  userId: number;
}
