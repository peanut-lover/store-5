import { DeliveryInfo } from './../../entity/DeliveryInfo';
import { Response } from 'express';
import { Goods } from '../../entity/Goods';
export type DetailGoodsResponse = Response &
  Goods & {
    goodsImgs: string[] | undefined;
    deliveryInfo: DeliveryInfo;
  };
