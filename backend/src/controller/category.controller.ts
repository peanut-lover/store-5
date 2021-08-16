import { Request, Response } from 'express';
import CategoryService from '../service/category.service';

async function createCategory(req: Request, res: Response) {
  const { parentId, name } = req.body;
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

export default {
  createCategory,
  getAllCategory,
};
