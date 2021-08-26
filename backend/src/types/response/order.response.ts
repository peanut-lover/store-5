import { Order } from '../../entity/Order';

export interface OrderListMetaData {
  page: number;
  limit: number;
  totalPage: number;
  totalCount: number;
}

export interface OrderListPaginationResponse {
  meta?: OrderListMetaData;
  orderList?: Order[];
}
