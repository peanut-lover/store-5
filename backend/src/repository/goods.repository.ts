import { getRepository } from 'typeorm';
import { GOODS_DB_ERROR } from '../constants/database-error-name';
import { DatabaseError } from '../errors/base.error';
import { Goods } from '../entity/Goods';
import { CreateGoodsRequest } from '../types/request/goods.request';
import { FindAllCategoryProps } from '../types/Goods';

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
}: FindAllCategoryProps): Promise<Goods[] | undefined> {
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

export const GoodsRepository = {
  findGoodsDetailById,
  findAllByCategory,
  findTotalCountByCategory,
  findSellCountAverage,
};
