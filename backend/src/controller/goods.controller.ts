import { Request, Response } from 'express';
import { GoodsService } from '../service/goods.service';
import { DetailGoodsResponse } from '../types/response/goods.response';

async function getGoodsDetail(req: Request, res: DetailGoodsResponse) {
  const goodsId = +req.params.id;
  const result = await GoodsService.getDetailById(goodsId);
  res.status(200).json(result);
}

export const GoodsController = {
  getGoodsDetail,
};
