import { Request } from 'express';
export interface AddressBody {
  name: string;
  receiver: string;
  zipCode: string;
  address: string;
  subAddress: string;
  isDefault: boolean;
}
export interface CreateAddressRequest extends Request {
  body: AddressBody;
}
