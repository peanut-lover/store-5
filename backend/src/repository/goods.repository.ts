import { FindOperator, getRepository, Like, MoreThan } from 'typeorm';
import { GOODS_DB_ERROR } from '../constants/database.error.name';
import { DatabaseError } from '../errors/base.error';
import { Goods } from '../entity/Goods';
import { FindAllProps, FindTotalCountProps, GoodsState } from '../types/Goods';
import { TaggedGoodsType } from '../types/response/goods.response';
import { SearchedGoodsFromKeyword } from '../types/response/search.response';

const AUTO_SEARCH_GOODS_NUMBER = 10;

async function findGoodsById(goodsId: number): Promise<Goods | undefined> {
  try {
    return await getRepository(Goods).findOne({ where: { id: goodsId } });
  } catch (error) {
    console.error(error);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findGoodsDetailById(goodsId: number): Promise<Goods | undefined> {
  try {
    return await getRepository(Goods).findOne({
      relations: ['category', 'deliveryInfo', 'goodsImgs'],
      where: {
        id: goodsId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findAllWithCategory(): Promise<Goods[]> {
  try {
    return await getRepository(Goods).find({
      relations: ['category'],
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findAllByOption({
  offset,
  limit,
  stock = 0,
  order,
  sort,
  category,
  state,
  title,
}: FindAllProps): Promise<TaggedGoodsType[]> {
  try {
    const where: {
      stock: FindOperator<number>;
      title?: FindOperator<string> | string;
      state?: GoodsState;
      category?: number;
    } = {
      stock: MoreThan(stock),
    };
    if (state) {
      where.state = state;
    }
    if (title) {
      where.title = Like(`%${title}%`);
    }
    if (category) {
      where.category = category;
    }
    const goodsRepo = getRepository(Goods);
    return await goodsRepo.find({
      skip: offset,
      take: limit,
      where,
      order: {
        [order]: sort,
      },
      relations: ['category'],
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findAllWishByUserId({ offset, limit, userId }: FindAllProps): Promise<TaggedGoodsType[]> {
  try {
    return await getRepository(Goods)
      .createQueryBuilder('goods')
      .leftJoinAndSelect('wish', 'w', 'w.goodsId = goods.id')
      .where(`w.userId = ${userId}`)
      .orderBy('w.createdAt', 'DESC')
      .offset(offset)
      .limit(limit)
      .getMany();
  } catch (err) {
    console.error(err);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

async function findTotalCountByOption({ stock, state, title, category }: FindTotalCountProps): Promise<number> {
  try {
    const where: {
      stock: FindOperator<number>;
      state?: GoodsState;
      title?: FindOperator<string> | string;
      category?: number;
    } = {
      stock: MoreThan(stock),
    };
    if (state) {
      where.state = state;
    }
    if (title) {
      where.title = Like(`%${title}%`);
    }
    if (category) {
      where.category = category;
    }
    return await getRepository(Goods).count({
      where,
    });
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
    take: AUTO_SEARCH_GOODS_NUMBER,
  });
}

async function findStockById(goodsId: number): Promise<number> {
  const goodsRepo = getRepository(Goods);
  const goods = await goodsRepo.findOne({
    select: ['stock'],
    where: { id: goodsId },
  });
  return goods?.stock ?? 0;
}

async function findBestSellingGoods(limit: number): Promise<Goods[]> {
  return getRepository(Goods).find({
    order: {
      countOfSell: 'DESC',
    },
    take: limit,
  });
}

export const GoodsRepository = {
  findGoodsById,
  findGoodsDetailById,
  findAllWithCategory,
  findAllByOption,
  findAllWishByUserId,
  findTotalCountByOption,
  findSellCountAverage,
  findStockById,
  findBestSellingGoods,
  searchGoodsFromKeyword,
};
