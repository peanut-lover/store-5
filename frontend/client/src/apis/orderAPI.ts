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

export const submitOrder = async (orderData: SubmitOrderBody): Promise<APIResponse<any>> => {
  const res = await checkedFetch(`/api/order`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(orderData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
