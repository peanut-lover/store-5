import { DeliveryInfo } from './../../entity/DeliveryInfo';
import { Response } from 'express';
import { Goods } from '../../entity/Goods';
export type DetailGoodsResponse = Response &
  Goods & {
    goodsImgs: string[] | undefined;
    deliveryInfo: DeliveryInfo;
  };

export interface ListGoodsMetaData {
  page: number;
  limit: number;
  totalPage: number;
  totalCount: number;
}

export type ListGoodsType = Goods & {
  isNew?: boolean;
  isBest?: boolean;
  isGreen?: boolean;
  isWish?: boolean;
};

export interface ListGoodsResponse {
  meta?: ListGoodsMetaData;
  goods?: ListGoodsType[];
}
