import { Payment } from '@src/types/Payment';
import { APIResponse, checkedFetch } from './base';

export const getPayments = async (): Promise<APIResponse<Payment[]>> => {
  const res = await checkedFetch('/api/payment');
  return await res.json();
};
