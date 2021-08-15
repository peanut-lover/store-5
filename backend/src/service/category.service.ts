import { Category } from '../entity/Category';
import { CategoryRepository } from '../repository/category.repository';

async function createSubCategory(parentId: number, name: string): Promise<Category> {
  return await CategoryRepository.createSubCategory(parentId, name);
}

export const CategoryService = {
  createSubCategory,
};
