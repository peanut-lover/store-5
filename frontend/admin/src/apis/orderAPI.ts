import { APIResponse, checkedFetch } from '@src/apis/base';
import { OrderPaginationResult } from '@src/types/Order';

const DEFAULT_ORDER_LIMIT = 5;

export interface GetOrdersProps {
  page: number;
  limit?: number;
}

export const getOrders = async ({
  page,
  limit = DEFAULT_ORDER_LIMIT,
}: GetOrdersProps): Promise<APIResponse<OrderPaginationResult>> => {
  const res = await checkedFetch(`/api/order?page=${page}&limit=${limit}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
