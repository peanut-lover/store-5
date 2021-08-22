import { Request, Response } from 'express';
import { INVALID_DATA } from '../constants/client.error.name';
import { Goods } from '../entity/Goods';
import { BadRequestError } from '../errors/client.error';
import { GoodsService } from '../service/goods.service';
import { FindAllProps, GoodsState } from '../types/Goods';
import {
  CreateGoodsBody,
  CreateGoodsRequest,
  GetAllGoodsQuery,
  UpdateGoodsBody,
  UpdateGoodsRequest,
} from '../types/request/goods.request';
import { uploadProductImages } from '../utils/aws.upload';

async function createGoods(req: CreateGoodsRequest, res: Response) {
  const body: CreateGoodsBody = {
    title: req.body.title,
    isGreen: Boolean(req.body.isGreen),
    stock: Number(req.body.stock),
    state: req.body.state,
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

async function updateGoods(req: UpdateGoodsRequest, res: Response) {
  const goodsId = Number(req.params.id);
  const body: UpdateGoodsBody = {
    title: req.body.title,
    isGreen: Boolean(req.body.isGreen),
    stock: Number(req.body.stock),
    state: req.body.state,
    price: Number(req.body.price),
    discountRate: Number(req.body.discountRate),
    category: Number(req.body.category),
    deliveryInfo: Number(req.body.deliveryInfo),
    oldImages: req.body.oldImages,
  };

  const files = req.files;

  if (!files || !Array.isArray(files)) throw new BadRequestError(INVALID_DATA);

  const uploadFileUrls = await uploadProductImages(files);

  const result = await GoodsService.updateGoods(body, goodsId, uploadFileUrls);

  res.status(201).json({ result });
}

async function getGoodsDetail(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const userId = req.session.userId;
  const result = await GoodsService.getDetailById(goodsId, userId);
  res.status(200).json({ result });
}

async function getAllGoodsForClient(req: Request, res: Response) {
  const { page, limit, flag, category, keyword } = req.query;
  const query: GetAllGoodsQuery = {
    page: Number(page),
    limit: Number(limit),
  };
  if (category) query.category = Number(category);
  if (flag) query.flag = String(flag);
  if (keyword) query.keyword = String(keyword);
  const userId = req.session.userId;
  const isAdmin = false;
  const result = await GoodsService.getGoodsByOption(query, isAdmin, userId);
  return res.status(200).json({ result });
}

async function getAllGoodsForAdmin(req: Request, res: Response) {
  const { page, limit, keyword } = req.query;
  const query: GetAllGoodsQuery = {
    page: Number(page),
    limit: Number(limit),
  };
  if (keyword) query.keyword = String(keyword);
  const userId = req.session.userId;
  const isAdmin = true;
  const result = await GoodsService.getGoodsByOption(query, isAdmin, userId);
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

async function getGoodsImgById(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await GoodsService.getGoodsImgById(goodsId);
  return res.status(200).json({ result });
}

export const GoodsController = {
  createGoods,
  updateGoods,
  getGoodsDetail,
  getMainGoodsListMap,
  getGoodsStockById,
  getAllGoodsForClient,
  getAllGoodsForAdmin,
  getGoodsImgById,
};
