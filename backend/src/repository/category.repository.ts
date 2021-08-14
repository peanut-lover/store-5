import { getRepository } from 'typeorm';
import { CATEGORY_DB_ERROR } from '../constants/database-error-name';
import { Category } from '../entity/Category';
import { DatabaseError } from '../errors/base.error';
async function createCategory(name: string) {
  try {
    const categoryRepo = getRepository(Category);
    const category = await categoryRepo.create({ name });
    const result = await categoryRepo.insert(category);
    if (result.identifiers.length > 0) return category;
    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getCategoryByName(name: string) {
  try {
    const categoryRepo = getRepository(Category);
    const category = await categoryRepo.findOne({ name });
    return category ? category : null;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

export const CategoryRepository = {
  createCategory,
  getCategoryByName,
};
