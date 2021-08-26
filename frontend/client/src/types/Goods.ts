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
  countOfSell: number;
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

// TODO: 이름 바꿀 필요가 있음. GoodsPaginationResult
export interface GoodsPaginationResult {
  goodsList: ThumbnailGoods[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
}
