import { Request, Response } from 'express';
import { GoodsService } from '../service/goods.service';
import { GetAllByCategoryProps, GoodsFlag, GoodsState } from '../types/Goods';

const GoodsStateMap = {
  sale: 'S',
  temp: 'T',
  destroy: 'D',
};

const GoodsFlag = {
  best: 'best',
  low: 'low',
  high: 'high',
  latest: 'latest',
};

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await GoodsService.getDetailById(goodsId);
  res.status(200).json({ result });
}

async function getAllGoodsCategory(req: Request, res: Response) {
  const { category, page, flag = GoodsFlag.latest, limit, state = GoodsStateMap.sale } = req.query;

  // TODO : 타입 체크
  const GoodsListParams: GetAllByCategoryProps = {
    categoryName: String(category),
    page: Number(page),
    flag: String(flag) as GoodsFlag,
    limit: Number(limit),
    state: String(state) as GoodsState,
    userId: req.userId,
  };

  console.log(GoodsListParams);

  const data = await GoodsService.getAllSaleGoodsByCategory(GoodsListParams);
  return res.json(data);
}

export const GoodsController = {
  getGoodsDetail,
  getAllGoodsCategory,
};
