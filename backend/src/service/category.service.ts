import { INVALID_DATA } from './../constants/client.error.name';
import { BadRequestError } from './../errors/client.error';
import { GoodsRepository } from './../repository/goods.repository';
import { Category } from '../entity/Category';
import {
  CategoryCountResponse,
  CategoryResponse,
  CategorySellCountResponse,
  CategoryViewCountResponse,
} from '../types/response/category.response';
import { CategoryRepository } from '../repository/category.repository';
import { isNumber } from '../utils/check.primitive.type';

const BEST_LIST_LENGTH = 5;

async function createCategory(name: string, parentId?: number): Promise<Category> {
  if (parentId) {
    return await CategoryRepository.createSubCategory(name, parentId);
  } else {
    return await CategoryRepository.createCategory(name);
  }
}

async function getAllCategory(): Promise<CategoryResponse[]> {
  const categories = await CategoryRepository.getAllCategories();
  const categoryMap = new Map<number, CategoryResponse>();

  // 최상위 카테고리 데이터 생성
  categories
    .filter((category) => !category.parent)
    .forEach((parentCategory) => {
      categoryMap.set(parentCategory.id, {
        id: parentCategory.id,
        name: parentCategory.name,
        categories: [],
      });
    });

  // 서브 카테고리 데이터 생성
  categories
    .filter((category) => category.parent !== undefined)
    .forEach((category) => {
      const parentCategoryResponse = categoryMap.get(category.parent);
      if (parentCategoryResponse) {
        parentCategoryResponse.categories?.push({
          id: category.id,
          name: category.name,
        });
      }
    });

  return Array.from(categoryMap.entries()).map(([_, value]) => value);
}

async function getCategoryCount(): Promise<CategoryCountResponse> {
  const childCategories = await CategoryRepository.getChildCategories();
  return childCategories.map((category) => {
    return { name: category.name, value: category.goodsList.length };
  });
}

async function getTopSellingCategory(): Promise<CategorySellCountResponse> {
  const result = [];
  const categories: {
    [key: string]: number;
  } = {};
  const goods = await GoodsRepository.findAllWithCategory();
  goods.forEach((item) => {
    if (categories[item.category.name]) {
      categories[item.category.name] += item.countOfSell;
    } else {
      categories[item.category.name] = item.countOfSell;
    }
  });
  for (let key in categories) {
    result.push({ name: key, total: categories[key] });
  }
  result.sort((a, b) => b.total - a.total);
  const MAX_END = result.length > BEST_LIST_LENGTH ? BEST_LIST_LENGTH : result.length;
  return result.slice(0, MAX_END);
}

async function getCategoryViews(): Promise<CategoryViewCountResponse> {
  const result: CategoryViewCountResponse = [];
  const categories: {
    [key: string]: number;
  } = {};
  const goods = await GoodsRepository.findAllWithCategory();
  // category parentId를 key로 조회 수 총합을 구합니다.
  goods.forEach((item) => {
    let parent;
    if (!item.category.parent && item.category) parent = item.category.id;
    else parent = item.category.parent;
    if (categories[parent]) {
      categories[parent] += item.view;
    } else {
      categories[parent] = item.view;
    }
  });
  await Promise.all(Object.keys(categories).map((key) => pushCategoryViewToList(Number(key), categories[key], result)));
  return result;
}

async function pushCategoryViewToList(
  categoryId: number,
  view: number,
  categoryViewList: CategoryViewCountResponse
): Promise<void> {
  const category = await CategoryRepository.getCategoryNameById(categoryId);
  if (!category) throw new BadRequestError(INVALID_DATA);
  const { name } = category;
  categoryViewList.push({ name, view });
}

export default {
  createCategory,
  getAllCategory,
  getCategoryCount,
  getTopSellingCategory,
  getCategoryViews,
};
