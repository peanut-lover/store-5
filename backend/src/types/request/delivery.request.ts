import { Request } from 'express';
export interface CreateDeliveryInfoBody {
  name: string;
  deliveryFee: number;
  deliveryDetail: string;
}

export interface CreateDeliveryRequest extends Request {
  body: CreateDeliveryInfoBody;
}
