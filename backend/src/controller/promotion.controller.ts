import { Request, Response } from 'express';
import { INVALID_DATA } from '../constants/client-error-name';
import { BadRequestError } from '../errors/client.error';
import { PromotionService } from '../service/promotion.service';
import { CreatePromotionRequest } from '../types/request/promotion.request';

async function createPromotion(req: CreatePromotionRequest, res: Response) {
  const body = req.body;
  const file = req.file;
  if (!file) throw new BadRequestError(INVALID_DATA);
  // TODO: S3 연동 후 연동 작업 할 예정!
  const imgUrl = `http://${req.get('host')}/${file.path}}`;
  // const result = await PromotionService.createPromotion(body);
  // res.status(201).json({ result });
}

async function getPromotions(req: Request, res: Response) {
  const result = await PromotionService.getPromotions();
  res.status(200).json({ result });
}

export const PromotionController = {
  createPromotion,
  getPromotions,
};
