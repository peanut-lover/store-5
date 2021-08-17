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
}

export type ThumbnailGoods = Goods;

export type DetailGoods = Goods & {
  deliveryFee: number;
  deliveryDetail: string;
  goodsImgs?: string[];
};

export type CartGoods = Goods & {
  thumbnailUrl: string;
  discountRate: number;
  amount: number;
  stock: number;
  isSelected: boolean;
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
