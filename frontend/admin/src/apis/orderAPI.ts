import { APIResponse, checkedFetch } from '@src/apis/base';
import { OrderPaginationResult } from '@src/types/Order';

const DEFAULT_ORDER_LIMIT = 5;

export interface GetAllOrdersProps {
  page: number;
  limit?: number;
}

export const getAllOrders = async ({
  page,
  limit = DEFAULT_ORDER_LIMIT,
}: GetAllOrdersProps): Promise<APIResponse<OrderPaginationResult>> => {
  const res = await checkedFetch(`/api/order/admin?page=${page}&limit=${limit}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
