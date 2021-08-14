import { Request, Response } from 'express';
import { GoodsService } from '../service/goods.service';

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = req.params.id;
  GoodsService.getDetailById(+goodsId);
}

export const GoodsController = {
  getGoodsDetail,
};
