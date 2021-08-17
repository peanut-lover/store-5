import { DeliveryInfo } from '../entity/DeliveryInfo';
import { DeliveryInfoRepository } from '../repository/delivery.info.repository';
import { CreateDeliveryInfoBody } from '../types/request/delivery.request';

async function createDeliveryInfo(body: CreateDeliveryInfoBody): Promise<DeliveryInfo> {
  return await DeliveryInfoRepository.createDeliveryInfo(body);
}

async function getDeliveryInfos(): Promise<DeliveryInfo[]> {
  return await DeliveryInfoRepository.getDeliveryInfos();
}

export const DeliveryService = {
  createDeliveryInfo,
  getDeliveryInfos,
};
