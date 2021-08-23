import { Order, OrderPaginationResult } from '@src/types/Order';
import { APIResponse, checkedFetch } from './base';

interface GoodsInfoForOrder {
  id: number;
  amount: number;
}

interface SubmitOrderBody {
  orderMemo: string;
  receiver: string;
  zipCode: string;
  address: string;
  subAddress: string;
  goodsList: GoodsInfoForOrder[];
  paymentId: number;
  cartIds?: number[];
}

export const submitOrder = async (orderData: SubmitOrderBody): Promise<boolean> => {
  await checkedFetch(`/api/order`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(orderData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return true;
};

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
  });
  return await res.json();
};

const OrderAPI = {
  submitOrder,
  getOrders,
};

export default OrderAPI;
