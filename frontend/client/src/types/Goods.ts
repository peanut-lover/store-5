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
  isWished?: boolean;
  stock?: number;
}

export type ThumbnailGoods = Goods;

export type DetailGoods = Goods & {
  deliveryFee: number;
  deliveryDetail: string;
  imgs?: string[];
};

export type CartGoods = {
  id: number;
  amount: number;
  isSelected: boolean;
  goods: Goods;
};

export type MainGoodsListResult = {
  bestGoodsList: ThumbnailGoods[];
  latestGoodsList: ThumbnailGoods[];
  discountGoodsList: ThumbnailGoods[];
};

export type OrderGoods = Goods & {
  thumbnailUrl: string;
  discountRate: number;
  amount: number;
  stock: number;
};
