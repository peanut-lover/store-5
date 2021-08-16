import { Request } from 'express';
export interface CreatePaymentBody {
  name: string;
  type: string;
}

export interface CreatePaymentRequest extends Request {
  body: CreatePaymentBody;
}
