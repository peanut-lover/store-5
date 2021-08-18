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

export type ThumbnailGoods = Goods;

export type DetailGoods = Goods & {
  deliveryFee: number;
  deliveryDetail: string;
  category: {
    id: number;
    name: string;
  };
  goodsImgs?: string[];
};

export interface CartGoods {
  id: number;
  amount: number;
  goods: Goods;
  isSelected: boolean;
}

export interface GoodsBeforeOrder {
  amount: number;
  goods: Goods;
}

export type MainGoodsListResult = {
  bestGoodsList: ThumbnailGoods[];
  latestGoodsList: ThumbnailGoods[];
  discountGoodsList: ThumbnailGoods[];
};
