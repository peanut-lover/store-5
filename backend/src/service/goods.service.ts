import { MoreThan } from 'typeorm';
import { Goods } from '../entity/Goods';
import { GoodsRepository } from '../repository/goods.repository';
import { DetailGoodsResponse } from '../types/response/goods.response';
import { WishRepository } from '../repository/wish.repository';
import { FindAllCategoryProps, GetAllByCategoryProps } from '../types/Goods';
import { ListGoodsMetaData, ListGoodsResponse } from '../types/response/goods.response';
import { pagination } from '../utils/pagination';

async function getDetailById(id: number): Promise<DetailGoodsResponse> {
  const data = await GoodsRepository.findGoodsDetailById({ id });
  const imgs = data?.goodsImgs.map((goodsImg) => goodsImg.url);
  const res = JSON.parse(JSON.stringify(data));
  delete res.goodsImgs;
  return { ...res, goodsImgs: imgs };
}

async function getAllByCategory({ category, page, flag, limit, state }: GetAllByCategoryProps) {
  const option: FindAllCategoryProps = {
    category: +category,
    offset: pagination.calculateOffset(+page, +limit),
    limit: +limit,
    where: {
      state,
      stock: MoreThan(0),
    },
    order: getCategoryByFlag(flag) ?? 'createdAt',
    sort: getSortByFlag(flag),
  };

  const result: ListGoodsResponse = {};

  result.goods = await GoodsRepository.findAllByCategory(option);
  if (!result.goods) return undefined;

  const totalCount = await GoodsRepository.findTotalCountByCategory(+category);
  const goodsSellCountAverage = await GoodsRepository.findSellCountAverage();

  result.goods.forEach((goods) => {
    goods.isBest = goodsSellCountAverage < goods.countOfSell;
    goods.isNew = checkNewGoods(goods.createdAt);
  });
  result.meta = getListGoodsMeta(+page, +limit, totalCount);
  return undefined;
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

  result.goods = await GoodsRepository.findAllByCategory(option);
  if (!result.goods) return undefined;

  const totalCount = await GoodsRepository.findTotalCountByCategory(+category);
  const wishSet = new Set(await WishRepository.findWishByUserId(userId));
  const goodsSellCountAverage = await GoodsRepository.findSellCountAverage();

  result.goods.forEach((goods) => {
    goods.isWish = wishSet.has(goods.id);
    goods.isBest = goodsSellCountAverage < goods.countOfSell;
    goods.isNew = checkNewGoods(goods.createdAt);
  });
  result.meta = getListGoodsMeta(+page, +limit, totalCount);
  return undefined;
}

function getCategoryByFlag(flag: string): keyof Goods {
  return flag === 'low' || flag === 'high' ? 'price' : 'countOfSell';
}

function getSortByFlag(flag: string): 'DESC' | 'ASC' {
  return flag === 'high' || flag === 'best' ? 'DESC' : 'ASC';
}

function checkNewGoods(date: Date): boolean {
  const DAY_DIVIDE = 1000 / 60 / 60 / 24;
  const NEW_PRODUCT_BASE_DAY = 7;
  const nowTime = new Date().getTime();
  return (nowTime - date.getTime()) / DAY_DIVIDE < NEW_PRODUCT_BASE_DAY;
}

function getListGoodsMeta(page: number, limit: number, totalCount: number): ListGoodsMetaData {
  return {
    page,
    limit,
    totalPage: getTotalPage(totalCount, limit),
    totalCount,
  };
}

function getTotalPage(totalCount: number, limit: number): number {
  return Math.ceil(totalCount / limit);
}

export const GoodsService = {
  getDetailById,
  getAllByCategory,
  getAllByCategoryInSalesState,
};
