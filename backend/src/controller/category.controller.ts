import { Request, Response } from 'express';
import { INVALID_DATA } from '../constants/client.error.name';
import { BadRequestError } from '../errors/client.error';
import CategoryService from '../service/category.service';

async function createCategory(req: Request, res: Response) {
  const { parentId, name } = req.body;
  if (!name) throw new BadRequestError(INVALID_DATA);
  const result = await CategoryService.createCategory(name, parentId);
  res.status(200).json({ result });
}

async function getAllCategory(req: Request, res: Response) {
  const categories = await CategoryService.getAllCategory();
  res.status(200).json({
    result: {
      categories,
    },
  });
}

async function getCategoryGoodsCounts(req: Request, res: Response) {
  const result = await CategoryService.getCategoryGoodsCount();
  res.status(200).json({ result });
}

async function getTopSellingCategory(req: Request, res: Response) {
  const result = await CategoryService.getTopSellingCategory();
  res.status(200).json({ result });
}

async function getCategoryViews(req: Request, res: Response) {
  const result = await CategoryService.getCategoryViews();
  res.status(200).json({ result });
}

async function getCategoryByGoodsId(req: Request, res: Response) {
  const goodsId = Number(req.params.id);
  const result = await CategoryService.getCategoryByGoodsId(goodsId);
  res.status(200).json({ result });
}

export default {
  createCategory,
  getAllCategory,
  getCategoryGoodsCounts,
  getTopSellingCategory,
  getCategoryViews,
  getCategoryByGoodsId,
};
