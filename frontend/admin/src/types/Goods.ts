export interface CreatedGoods {
  id: number;
  title: string;
  price: number;
  stock: number;
  discountRate: number;
  countOfSell: number;
  isGreen: boolean;
  deliveryInfo: number;
  state: string;
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

export interface GetGoodsByOptionProps {
  title?: string;
  order: string;
  page?: number;
  limit?: number;
  sort?: 'DESC' | 'ASC';
}
