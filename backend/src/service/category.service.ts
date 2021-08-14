import { CategoryRepository } from '../repository/category.repository';

async function createSubCategory(parentId: number, name: string) {
  return await CategoryRepository.createSubCategory(parentId, name);
}

export const CategoryService = {
  createSubCategory,
};
