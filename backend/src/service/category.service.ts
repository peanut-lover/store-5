import { GoodsRepository } from './../repository/goods.repository';
import { Category } from '../entity/Category';
import {
  CategoryCountResponse,
  CategoryResponse,
  CategorySellCountResponse,
} from '../types/response/category.response';
import { CategoryRepository } from '../repository/category.repository';

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

async function getParentCategoryCount(): Promise<CategoryCountResponse> {
  const categoryCountList: CategoryCountResponse = [];
  const parentCategories = await CategoryRepository.getParentCategories();
  await Promise.all(
    parentCategories.map(async (category) => await pushCategoryCountToList(category, categoryCountList))
  );
  return categoryCountList;
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

async function getCategoryViews() {
  const result = [];
  const categories: {
    [key: string]: number;
  } = {};
  const goods = await GoodsRepository.findAllWithCategory();
  // category parentId를 key로 조회 수 총합을 구합니다.
  goods.forEach((item) => {
    if (categories[item.category.parent]) {
      categories[item.category.parent] += item.view;
    } else {
      categories[item.category.parent] = item.view;
    }
  });
}

async function pushCategoryCountToList(category: Category, categoryCountList: CategoryCountResponse): Promise<void> {
  const count = await CategoryRepository.getCategoryCountByParentId(category.id);
  categoryCountList.push({
    name: category.name,
    value: count,
  });
}

export default {
  createCategory,
  getAllCategory,
  getParentCategoryCount,
  getTopSellingCategory,
  getCategoryViews,
};
