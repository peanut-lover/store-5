import { Request, Response } from 'express';
import { PromotionService } from '../service/promotion.service';
import { CreatePromotionRequest } from '../types/request/promotion.request';

async function createPromotion(req: CreatePromotionRequest, res: Response) {
  const body = req.body;
  const result = await PromotionService.createPromotion(body);
  res.status(201).json({ result });
}

async function getPromotions(req: Request, res: Response) {
  const result = await PromotionService.getPromotions();
  res.status(200).json({ result });
}

export const PromotionController = {
  createPromotion,
  getPromotions,
};
