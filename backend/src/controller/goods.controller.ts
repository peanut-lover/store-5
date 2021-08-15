import { Request, Response } from 'express';
import { GoodsService } from '../service/goods.service';
import { GetAllGoodsRequest } from '../types/request/goods.request';

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await GoodsService.getDetailById(goodsId);
  res.status(200).json({ result });
}

async function getAllGoodsCategory(req: GetAllGoodsRequest, res: Response) {
  const userId = req.userId;
  const data = await GoodsService.getAllByCategoryInSalesState({
    ...req.query,
    userId,
  });
  return res.json(data);
}

export const GoodsController = {
  getGoodsDetail,
  getAllGoodsCategory,
};
