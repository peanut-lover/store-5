import { Request, Response } from 'express';
import { INVALID_DATA } from '../constants/client-error-name';
import { BadRequestError } from '../errors/client.error';
import { GoodsService } from '../service/goods.service';
import { GetAllByCategoryProps, GetAllByKeywordProps, GoodsFlag, GoodsState } from '../types/Goods';
import { CreateGoodsRequest } from '../types/request/goods.request';
import ConvertToURLfromFile from '../utils/convert.url.from.file';

export const GoodsStateMap = {
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

async function createGoods(req: CreateGoodsRequest, res: Response) {
  const body = req.body;
  const files = req.files;
  const HOST_URL = req.get('host');
  if (!files || !Array.isArray(files) || !HOST_URL) throw new BadRequestError(INVALID_DATA);
  const uploadFileUrls = ConvertToURLfromFile(files, HOST_URL);
  const result = await GoodsService.createGoods(body, uploadFileUrls);
  res.status(201).json({ result });
}

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await GoodsService.getDetailById(goodsId);
  res.status(200).json({ result });
}

async function getAllGoodsCategory(req: Request, res: Response) {
  const { page, category, flag = GoodsFlag.latest, limit, state = GoodsStateMap.sale } = req.query;
  // TODO : 타입 체크
  const GoodsListParams: GetAllByCategoryProps = {
    categoryName: String(category),
    page: Number(page),
    flag: String(flag) as GoodsFlag,
    limit: Number(limit),
    state: String(state) as GoodsState,
    userId: req.userId,
  };

  const result = await GoodsService.getAllSaleGoodsByCategory(GoodsListParams);
  return res.json({ result });
}

async function getAllSaleGoodsByKeyword(req: Request, res: Response) {
  const { page, keyword, limit, state = GoodsStateMap.sale } = req.query;
  // TODO : 타입 체크
  const GoodsListParams: GetAllByKeywordProps = {
    keyword: String(keyword),
    page: Number(page),
    limit: Number(limit),
    state: String(state) as GoodsState,
    userId: req.userId,
  };

  const result = await GoodsService.getAllSaleGoodsByKeyword(GoodsListParams);
  return res.json({ result });
}

async function getMainGoodsListMap(req: Request, res: Response) {
  const result = await GoodsService.getMainGoodsListMap();
  return res.json({ result });
}

export const GoodsController = {
  createGoods,
  getGoodsDetail,
  getAllGoodsCategory,
  getAllSaleGoodsByKeyword,
  getMainGoodsListMap,
};
