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
}

export const submitOrder = async (orderData: SubmitOrderBody): Promise<boolean> => {
  const res = await checkedFetch(`/api/order`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(orderData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return true;
};

export const getOrders = async (page: number, limit: number): Promise<APIResponse<OrderPaginationResult>> => {
  const res = await checkedFetch(`/api/order?page=${page}&limit=${limit}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

const OrderAPI = {
  submitOrder,
  getOrders,
};

export default OrderAPI;
