import { UserAddress } from './../../entity/UserAddress';
import { Response } from 'express';

export type CreateUserAddressResponse = Response & UserAddress;
export type UserAddressesResponse = Response & UserAddress[];
