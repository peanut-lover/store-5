import { getRepository, Like, MoreThan } from 'typeorm';
import { GOODS_DB_ERROR } from '../constants/database-error-name';
import { DatabaseError } from '../errors/base.error';
import { Goods } from '../entity/Goods';
import { CreateGoodsRequest } from '../types/request/goods.request';
import { FindAllCategoryProps, FindAllColumnNameProps, FindAllKeywordProps } from '../types/Goods';
import { TaggedGoodsType } from '../types/response/goods.response';
import { SearchedGoodsFromKeyword } from '../types/response/search.response';
import { GoodsStateMap } from '../controller/goods.controller';

async function findGoodsDetailById({ id }: { id: number }) {
  try {
    const result = await getRepository(Goods).findOne({
      relations: ['category', 'deliveryInfo', 'goodsImgs'],
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function createGoods(requestGoods: CreateGoodsRequest) {
  const goodsRepo = getRepository(Goods);
  const { title, price, stock, discountRate, state } = requestGoods;
  const goods = await goodsRepo.create({
    thumbnailUrl: 'as',
    countOfSell: 123,
    isGreen: false,
    title: 'asd',
    price: 300,
    stock: 100,
    discountRate: 10,
    state: 'S',
  });
}

async function findAllByCategory({
  category,
  where,
  offset,
  limit,
  order = 'createdAt',
  sort = 'ASC',
}: FindAllCategoryProps): Promise<TaggedGoodsType[] | undefined> {
  try {
    const goodsRepo = getRepository(Goods);
    const data = await goodsRepo.find({
      where: {
        category,
        ...where,
      },
      skip: offset,
      take: limit,
      order: {
        [order]: sort,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findAllByKeyword({
  keyword,
  offset,
  limit,
}: FindAllKeywordProps): Promise<TaggedGoodsType[] | undefined> {
  try {
    const goodsRepo = getRepository(Goods);
    return await goodsRepo.find({
      where: {
        state: GoodsStateMap.sale,
        stock: MoreThan(0),
        title: Like(`%${keyword}%`),
      },
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findAllByColumnName({
  columnName,
  limit,
}: FindAllColumnNameProps): Promise<TaggedGoodsType[] | undefined> {
  try {
    const goodsRepo = getRepository(Goods);
    const data = await goodsRepo.find({
      take: limit,
      where: {
        state: GoodsStateMap.sale,
        stock: MoreThan(0),
      },
      order: {
        [columnName]: 'ASC',
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findTotalCountByCategory(category: number): Promise<number> {
  try {
    const goodsRepo = getRepository(Goods);
    const count = await goodsRepo.count({
      where: {
        category,
      },
    });
    return count;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findTotalCountByKeyword(keyword: string): Promise<number> {
  try {
    const goodsRepo = getRepository(Goods);
    const count = await goodsRepo.count({
      where: { title: Like(`%${keyword}%`) },
    });
    return count;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findSellCountAverage(): Promise<number> {
  try {
    const result = await getRepository(Goods)
      .createQueryBuilder('goods')
      .select('TRUNCATE(AVG(goods.countOfSell), 1)', 'avg')
      .getRawOne();

    return result.avg;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function searchGoodsFromKeyword(keyword: string): Promise<SearchedGoodsFromKeyword[]> {
  const goodsRepo = getRepository(Goods);
  return await goodsRepo.find({
    select: ['id', 'thumbnailUrl', 'title'],
    where: { title: Like(`%${keyword}%`) },
    take: 5,
  });
}

export const GoodsRepository = {
  findGoodsDetailById,
  findAllByCategory,
  findAllByColumnName,
  findAllByKeyword,
  findTotalCountByCategory,
  findTotalCountByKeyword,
  findSellCountAverage,
  searchGoodsFromKeyword,
};
