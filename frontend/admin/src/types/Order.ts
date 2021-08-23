import { Goods } from '@src/types/Goods';

export interface Payment {
  id: number;
  name: string;
  type: string;
}

export interface OrderItem {
  id: string;
  amount: number;
  price: number;
  discountRate: number;
  state: string;
  createdAt: string;
  updatedAt: string;
  goods: Goods;
}
export interface OrderUser {
  id: number;
  name: string;
  profileImgUrl: string;
}

export interface Order {
  id: number;
  address: string;
  orderMemo: string;
  receiver: string;
  state: string;
  subAddress: string;
  payment: Payment;
  zipCode: string;
  updatedAt: string;
  createdAt: string;
  orderItems: OrderItem[];
  user: OrderUser;
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
