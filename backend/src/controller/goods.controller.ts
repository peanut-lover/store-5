import { Request, Response } from 'express';
import { INVALID_DATA } from '../constants/client-error-name';
import { BadRequestError } from '../errors/client.error';
import { GoodsService } from '../service/goods.service';
import { GetAllByCategoryProps, GetAllByKeywordProps, GoodsFlag, GoodsState } from '../types/Goods';
import { CreateGoodsBody, CreateGoodsRequest } from '../types/request/goods.request';
import { uploadProductImages } from '../utils/aws.upload';

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
  const body: CreateGoodsBody = {
    ...req.body,
    price: Number(req.body.price),
    discountRate: Number(req.body.discountRate),
    category: Number(req.body.category),
    deliveryInfo: Number(req.body.deliveryInfo),
  };

  const files = req.files;

  if (!files || !Array.isArray(files)) throw new BadRequestError(INVALID_DATA);

  const uploadFileUrls = await uploadProductImages(files);

  const result = await GoodsService.createGoods(body, uploadFileUrls);

  res.status(201).json({ result });
}

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const userId = req.session.userId;
  const result = await GoodsService.getDetailById(goodsId, userId);
  res.status(200).json({ result });
}

async function getAllGoodsCategory(req: Request, res: Response) {
  const { page, category, flag = GoodsFlag.latest, limit, state = GoodsStateMap.sale } = req.query;
  const userId = req.session.userId;
  // TODO : 타입 체크
  const GoodsListParams: GetAllByCategoryProps = {
    categoryName: String(category),
    page: Number(page),
    flag: String(flag) as GoodsFlag,
    limit: Number(limit),
    state: String(state) as GoodsState,
    userId,
  };

  const result = await GoodsService.getAllSaleGoodsByCategory(GoodsListParams);
  return res.status(200).json({ result });
}

async function getAllSaleGoodsByKeyword(req: Request, res: Response) {
  const { page, keyword, limit, state = GoodsStateMap.sale } = req.query;
  const userId = req.session.userId;
  // TODO : 타입 체크
  const GoodsListParams: GetAllByKeywordProps = {
    keyword: String(keyword),
    page: Number(page),
    limit: Number(limit),
    state: String(state) as GoodsState,
    userId,
  };

  const result = await GoodsService.getAllSaleGoodsByKeyword(GoodsListParams);
  return res.status(200).json({ result });
}

async function getMainGoodsListMap(req: Request, res: Response) {
  const userId = req.session.userId;
  const result = await GoodsService.getMainGoodsListMap(userId);
  return res.status(200).json({ result });
}

async function getGoodsStockById(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await GoodsService.getGoodsStockById(goodsId);
  return res.status(200).json({ result });
}

async function getGoodsForAdmin(req: Request, res: Response) {
  const { page, keyword, limit, order, sort } = req.query;

  if (isNaN(Number(page))) throw new BadRequestError(INVALID_DATA);
  if (isNaN(Number(limit))) throw new BadRequestError(INVALID_DATA);
  if (sort && sort !== 'ASC' && sort !== 'DESC') throw new BadRequestError(INVALID_DATA);

  const result = await GoodsService.getGoodsForAdmin(
    Number(page),
    Number(limit),
    String(keyword),
    String(order),
    String(sort)
  );
  return res.status(200).json({ result });
}

export const GoodsController = {
  createGoods,
  getGoodsDetail,
  getAllGoodsCategory,
  getAllSaleGoodsByKeyword,
  getMainGoodsListMap,
  getGoodsStockById,
  getGoodsForAdmin,
};
