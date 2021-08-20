import { OrderList } from '../../entity/OrderList';

export interface OrderListMetaData {
  page: number;
  limit: number;
  totalPage: number;
  totalCount: number;
}

export interface OrderListWithThumbnail extends OrderList {
  title: string;
  thumbnailUrl: string;
}

export interface OrderListPaginationResponse {
  meta?: OrderListMetaData;
  orderList?: OrderListWithThumbnail[];
}

export type GetOrderListResponse = OrderListWithThumbnail[];
