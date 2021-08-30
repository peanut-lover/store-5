export type GoodsState = 'S' | 'T' | 'D';

export interface CreatedGoods {
  id: number;
  title: string;
  price: number;
  stock: number;
  discountRate: number;
  countOfSell: number;
  isGreen: boolean;
  deliveryInfo: number;
  state: GoodsState;
  thumbnailUrl: string;
}

export type GoodsItem = CreatedGoods & {
  category: {
    name: string;
    id: number;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
};

export interface GoodsPaginationResult {
  goodsList: GoodsItem[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
}

export interface GetGoodsByOptionProps {
  page: number;
  limit: number;
  sort?: 'ASC' | 'DESC';
  flag?: string;
  keyword?: string;
}

export interface Goods {
  id: number;
  thumbnailUrl?: string; // thumbnailUrl
  title: string;
  price: number;
  isBest?: boolean;
  isGreen?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discountRate: number;
  isWish?: boolean;
  stock?: number;
}
