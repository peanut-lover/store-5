import { DeliveryInfo } from './../../entity/DeliveryInfo';
import { Response } from 'express';
import { Goods } from '../../entity/Goods';

export type DetailGoodsResponse = Response &
  Goods & {
    goodsImgs: string[] | undefined;
    deliveryInfo: DeliveryInfo;
  };

export interface GoodsListMetaData {
  page: number;
  limit: number;
  totalPage: number;
  totalCount: number;
}

export type TaggedGoodsType = Goods & {
  isNew?: boolean;
  isBest?: boolean;
  isGreen?: boolean;
  isWish?: boolean;
};

export interface GoodsListResponse {
  meta?: GoodsListMetaData;
  goods?: TaggedGoodsType[];
}
