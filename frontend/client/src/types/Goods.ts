export interface Goods {
  id: number;
  thumbnailImg?: string; // thumbnailImg
  title: string;
  price: number;
  isBest?: boolean;
  isGreen?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discountRate?: number;
}
