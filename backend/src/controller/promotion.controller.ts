import { Response } from 'express';
import { PromotionService } from '../service/promotion.service';
import { CreatePromotionRequest } from '../types/request/promotion.request';

async function createPromotion(req: CreatePromotionRequest, res: Response) {
  const body = req.body;
  const result = await PromotionService.createPromotion(body);
  res.status(201).json({ result });
}

export const PromotionController = {
  createPromotion,
};
