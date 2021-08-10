export interface Product {
  id: number;
  img?: string;
  title: string;
  price: number;
  isBest?: boolean;
  isGreen?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discountRate?: number;
}
