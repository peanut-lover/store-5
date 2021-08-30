import { getRepository, IsNull, Not } from 'typeorm';
import { CATEGORY_DB_ERROR } from '../constants/database.error.name';
import { Category } from '../entity/Category';
import { DatabaseError } from '../errors/base.error';

async function createCategory(name: string): Promise<Category> {
  try {
    const categoryRepo = getRepository(Category);
    const category = categoryRepo.create({ name });
    await categoryRepo.save(category);
    return category;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function createSubCategory(name: string, parentId: number): Promise<Category> {
  try {
    const categoryRepo = getRepository(Category);
    const category = categoryRepo.create({ name, parent: parentId });
    await categoryRepo.save(category);
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

async function getAllCategories(): Promise<Category[]> {
  try {
    const categoryRepo = getRepository(Category);
    const categories = await categoryRepo.find();
    return categories;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getChildCategories(): Promise<Category[]> {
  try {
    return getRepository(Category).find({
      relations: ['goodsList'],
      where: {
        parent: Not(IsNull()),
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getCategoryCountByParentId(parentId: number): Promise<number> {
  try {
    return getRepository(Category).count({ where: { parent: parentId } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getParentCategoryNameById(categoryId: number): Promise<Category | undefined> {
  try {
    return getRepository(Category).findOne({ select: ['name'], where: { id: categoryId } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getCategoryNameById(categoryId: number): Promise<Category | undefined> {
  try {
    return getRepository(Category).findOne({ select: ['name'], where: { id: categoryId } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(CATEGORY_DB_ERROR);
  }
}

async function getParentCategoryById(categoryId: number): Promise<Category | undefined> {
  try {
    return getRepository(Category).findOne({ where: { id: categoryId } });
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
  getChildCategories,
  getCategoryCountByParentId,
  getParentCategoryNameById,
  getCategoryNameById,
  getParentCategoryById,
};
