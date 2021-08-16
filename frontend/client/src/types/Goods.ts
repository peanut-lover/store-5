export interface Goods {
  id: number;
  thumbnailImg?: string; // thumbnailImg
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
  imgs?: string[];
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
