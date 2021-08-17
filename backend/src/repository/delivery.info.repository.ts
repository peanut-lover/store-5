import { DeliveryInfo } from './../entity/DeliveryInfo';
import { getRepository } from 'typeorm';
import { CreateDeliveryInfoBody } from '../types/request/delivery.request';

async function createDeliveryInfo(body: CreateDeliveryInfoBody): Promise<DeliveryInfo> {
  return await getRepository(DeliveryInfo).save({ ...body });
}

async function getDeliveryInfos(): Promise<DeliveryInfo[]> {
  return await getRepository(DeliveryInfo).find();
}

export const DeliveryInfoRepository = {
  createDeliveryInfo,
  getDeliveryInfos,
};
