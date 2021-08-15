import { MoreThan } from 'typeorm';
import { Goods } from '../entity/Goods';
import { GoodsRepository } from '../repository/goods.repository';
import { DetailGoodsResponse } from '../types/response/goods.response';
import { WishRepository } from '../repository/wish.repository';
import { FindAllCategoryProps, GetAllByCategoryProps } from '../types/Goods';
import { ListGoodsResponse } from '../types/response/goods.response';
import { pagination } from '../utils/pagination';

interface GoodsListMetaData {
  page: number;
  limit: number;
  totalPage: number;
  totalCount: number;
}

async function getDetailById(id: number): Promise<DetailGoodsResponse> {
  const data = await GoodsRepository.findGoodsDetailById({ id });
  const imgs = data?.goodsImgs.map((goodsImg) => goodsImg.url);
  const res = JSON.parse(JSON.stringify(data));
  delete res.goodsImgs;
  return { ...res, goodsImgs: imgs };
}

async function getAllByCategory({ category, page, flag, limit, state, userId }: GetAllByCategoryProps) {
  const option: FindAllCategoryProps = {
    category: +category,
    offset: pagination.calculateOffset(+page, +limit),
    limit: +limit,
    where: {
      state,
    },
    order: getCategoryByFlag(flag) ?? 'createdAt',
    sort: getSortByFlag(flag),
  };

  if (userId) await GoodsRepository.findAllByCategoryInLogined(option);
  else await GoodsRepository.findAllByCategory(option);
}

async function getAllByCategoryInSalesState({
  category,
  page,
  flag,
  limit,
  userId,
}: GetAllByCategoryProps): Promise<ListGoodsResponse | undefined> {
  const option: FindAllCategoryProps = {
    category: +category,
    offset: pagination.calculateOffset(+page, +limit),
    limit: +limit,
    where: {
      state: 'S',
      stock: MoreThan(0),
    },
    order: getCategoryByFlag(flag) ?? 'createdAt',
    sort: getSortByFlag(flag),
  };

  const result: ListGoodsResponse = {};
  // meta: {
  //   page:1,
  //   limit:10
  //   totalPage:100,
  //   totalCount: 1600,
  // },
  if (userId) result.goods = await GoodsRepository.findAllByCategoryInLogined(option);
  else result.goods = await GoodsRepository.findAllByCategory(option);
  if (!result.goods) return undefined;

  const totalCount = await GoodsRepository.findTotalCountByCategory(category);
  const wishSet = new Set(await WishRepository.findWishByUserId(userId));

  result.goods.forEach((goods) => {
    if (wishSet.has(goods.id)) {
      goods.isWish = true;
    }
    console.log(
      goods.createdAt,
      new Date(goods.createdAt),
      (new Date().getTime() - goods.createdAt.getTime()) / 1000 / 60 / 60
    );
  });

  result.meta = {
    page: +page,
    limit: +limit,
    totalPage: getTotalPage(totalCount, +limit),
    totalCount,
  };

  return undefined;
  // return {
  //   meta,
  // };

  // return {
  //   meta,
  //   goods: goodsList,
  // };
}

function getCategoryByFlag(flag: string): keyof Goods {
  return flag === 'low' || flag === 'high' ? 'price' : 'countOfSell';
}

function getSortByFlag(flag: string): 'DESC' | 'ASC' {
  return flag === 'high' || flag === 'best' ? 'DESC' : 'ASC';
}

function getTotalPage(totalCount: number, limit: number): number {
  return Math.ceil(totalCount / limit);
}

export const GoodsService = {
  getDetailById,
  getAllByCategory,
  getAllByCategoryInSalesState,
};
