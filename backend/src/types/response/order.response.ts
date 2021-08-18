import { OrderList } from '../../entity/OrderList';

interface GetOrderList extends OrderList {
  title: string;
  thumbnailUrl: string;
}

export type GetOrderListResponse = GetOrderList[];
