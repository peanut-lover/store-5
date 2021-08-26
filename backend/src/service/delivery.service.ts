import { isNumber } from 'util';
import { INVALID_DATA } from '../constants/client.error.name';
import { DeliveryInfo } from '../entity/DeliveryInfo';
import { BadRequestError } from '../errors/client.error';
import { DeliveryInfoRepository } from '../repository/delivery.info.repository';
import { CreateDeliveryInfoBody } from '../types/request/delivery.request';

async function createDeliveryInfo(body: CreateDeliveryInfoBody): Promise<DeliveryInfo> {
  if (!validateCreateDeliveryInfo(body)) throw new BadRequestError(INVALID_DATA);
  const { name, deliveryFee, deliveryDetail } = body;
  return await DeliveryInfoRepository.createDeliveryInfo({ name, deliveryFee, deliveryDetail });
}

async function getDeliveryInfos(): Promise<DeliveryInfo[]> {
  return await DeliveryInfoRepository.getDeliveryInfos();
}

function validateCreateDeliveryInfo(body: CreateDeliveryInfoBody): boolean {
  const { name, deliveryFee, deliveryDetail } = body;
  if (!name || !deliveryFee || !deliveryDetail) return false;
  if (!isNumber(deliveryFee)) return false;
  return true;
}

export const DeliveryService = {
  createDeliveryInfo,
  getDeliveryInfos,
};
