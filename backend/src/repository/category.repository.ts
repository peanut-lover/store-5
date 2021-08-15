import { getRepository } from 'typeorm';
import { CATEGORY_DB_ERROR } from '../constants/database-error-name';
import { Category } from '../entity/Category';
import { DatabaseError } from '../errors/base.error';

async function createCategory(name: string): Promise<Category> {
  try {
    const categoryRepo = getRepository(Category);
    const category = await categoryRepo.create({ name });
    await categoryRepo.insert(category);
    return category;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function createSubCategory(parentId: number, name: string): Promise<Category> {
  try {
    await createCategory(name);
    const categoryRepo = getRepository(Category);
    const category = await categoryRepo.create({ name, parent: parentId });
    await categoryRepo.insert(category);
    return category;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getCategoryByName(name: string): Promise<Category | undefined> {
  try {
    const categoryRepo = getRepository(Category);
    return await categoryRepo.findOne({ name });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getAllCategories() {
  try {
    const categoryRepo = getRepository(Category);
    const categories = await categoryRepo.find();
    const result = new Map();
    categories.forEach((category) => {
      if (!category.parent) {
        result.set(category.id, {
          ...category,
          categories: [],
        });
      } else {
        result.get(category.parent).categories.push(category);
      }
    });
    return result.size ? Array.from(result) : null;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

export const CategoryRepository = {
  createCategory,
  createSubCategory,
  getCategoryByName,
  getAllCategories,
};
