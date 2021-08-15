import { Request, Response } from 'express';
import { CategoryService } from '../service/category.service';

async function createSubCategory(req: Request, res: Response) {
  const { parentId, name } = req.body;
  const result = await CategoryService.createSubCategory(parentId, name);
  res.status(200).json(result);
}

export const CategoryController = {
  createSubCategory,
};
