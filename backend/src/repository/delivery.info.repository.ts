import { DeliveryInfo } from './../entity/DeliveryInfo';
import { getRepository } from 'typeorm';
import { CreateDeliveryInfoBody } from '../types/request/delivery.request';

async function createDeliveryInfo(name: string, deliveryFee: number, deliveryDetail: string): Promise<DeliveryInfo> {
  return await getRepository(DeliveryInfo).save({ name, deliveryFee, deliveryDetail });
}

async function getDeliveryInfos(): Promise<DeliveryInfo[]> {
  return await getRepository(DeliveryInfo).find();
}

export const DeliveryInfoRepository = {
  createDeliveryInfo,
  getDeliveryInfos,
};
