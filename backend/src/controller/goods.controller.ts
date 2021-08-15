import { Request, Response } from 'express';
import { GoodsService } from '../service/goods.service';
import { BadRequestError } from '../errors/client.error';
import { GetAllGoodsRequest } from '../types/request/goods.request';
import { INVALID_DATA } from '../constants/client-error-name';

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await GoodsService.getDetailById(goodsId);
  res.status(200).json({ result });
}

async function getAllGoodsCategory(req: GetAllGoodsRequest, res: Response) {
  const { category, page, flag, limit, state = 'S' } = req.query;
  const userId = req.userId;

  if (checkValidationValue([category, page, flag, limit, state])) throw new BadRequestError(INVALID_DATA);
  const data = await GoodsService.getAllByCategoryInSalesState({
    category,
    page,
    flag,
    limit,
    state,
    userId,
  });
  return res.json(data);
}

function checkValidationValue(datas: string[]): boolean {
  return Boolean(datas.find((data) => !data || data === 'undefined'));
}

export const GoodsController = {
  getGoodsDetail,
  getAllGoodsCategory,
};
