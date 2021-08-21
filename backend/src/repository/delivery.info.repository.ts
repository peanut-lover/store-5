import { DeliveryInfo } from './../entity/DeliveryInfo';
import { getRepository } from 'typeorm';
import { CreateDeliveryInfoBody } from '../types/request/delivery.request';

async function createDeliveryInfo(body: CreateDeliveryInfoBody): Promise<DeliveryInfo> {
  const { name, deliveryFee, deliveryDetail } = body;
  return await getRepository(DeliveryInfo).save({ name, deliveryFee, deliveryDetail });
}

async function getDeliveryInfos(): Promise<DeliveryInfo[]> {
  return await getRepository(DeliveryInfo).find();
}

export const DeliveryInfoRepository = {
  createDeliveryInfo,
  getDeliveryInfos,
};
