import { Payment } from '@src/types/Payment';
import { ThumbnailGoods } from './Goods';

export interface OrderItem {
  id: string;
  amount: number;
  price: number;
  discountRate: number;
  state: string;
  createdAt: string;
  updatedAt: string;
  goods: ThumbnailGoods;
}

export interface Order {
  id: number;
  address: string;
  orderMemo: string;
  receiver: string;
  state: string;
  subAddress: string;
  thumbnailUrl: string;
  title: string;
  payment: Payment;
  zipCode: string;
  updatedAt: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderPaginationResult {
  orderList: Order[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
}
