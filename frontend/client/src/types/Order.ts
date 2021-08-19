import { Payment } from '@src/types/Payment';

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
  updatedAt: Date;
  createdAt: Date;
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
