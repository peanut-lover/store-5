import { isNumber } from 'util';
import { INVALID_DATA } from '../constants/client.error.name';
import { DeliveryInfo } from '../entity/DeliveryInfo';
import { BadRequestError } from '../errors/client.error';
import { DeliveryInfoRepository } from '../repository/delivery.info.repository';

async function createDeliveryInfo(name: string, deliveryFee: number, deliveryDetail: string): Promise<DeliveryInfo> {
  if (!validateCreateDeliveryInfo(name, deliveryFee, deliveryDetail)) throw new BadRequestError(INVALID_DATA);
  return await DeliveryInfoRepository.createDeliveryInfo(name, deliveryFee, deliveryDetail);
}

async function getDeliveryInfos(): Promise<DeliveryInfo[]> {
  return await DeliveryInfoRepository.getDeliveryInfos();
}

function validateCreateDeliveryInfo(name: string, deliveryFee: number, deliveryDetail: string): boolean {
  if (!name || !deliveryFee || !deliveryDetail) return false;
  if (!isNumber(deliveryFee)) return false;
  return true;
}

export const DeliveryService = {
  createDeliveryInfo,
  getDeliveryInfos,
};
