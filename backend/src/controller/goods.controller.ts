import { Request, Response } from 'express';
import { GoodsService } from '../service/goods.service';

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await GoodsService.getDetailById(goodsId);
  res.status(200).json({ result });
}

async function getAllGoodsCategory(req: Request, res: Response) {
  const data = await GoodsService.getAllByCategoryInSalesState(req.goodsListParams);
  return res.json(data);
}

export const GoodsController = {
  getGoodsDetail,
  getAllGoodsCategory,
};
