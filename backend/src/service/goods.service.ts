import { MoreThan } from 'typeorm';
import { Goods } from '../entity/Goods';
import { GoodsRepository } from '../repository/goods.repository';
import { DetailGoodsResponse, GoodsListResponse, GoodsListMetaData } from '../types/response/goods.response';
import { WishRepository } from '../repository/wish.repository';
import { FindAllCategoryProps, GetAllByCategoryProps } from '../types/Goods';
import { pagination } from '../utils/pagination';
import { BadRequestError } from '../errors/client.error';
import { GOODS_DB_ERROR } from '../constants/database-error-name';

async function getDetailById(id: number): Promise<DetailGoodsResponse> {
  const data = await GoodsRepository.findGoodsDetailById({ id });
  const imgs = data?.goodsImgs.map((goodsImg) => goodsImg.url);
  const res = JSON.parse(JSON.stringify(data));
  delete res.goodsImgs;
  return { ...res, goodsImgs: imgs };
}

async function getAllByCategoryInSalesState({
  category,
  page,
  flag,
  limit,
  userId,
}: GetAllByCategoryProps): Promise<GoodsListResponse | undefined> {
  const totalCount = await GoodsRepository.findTotalCountByCategory(category);
  page = Math.min(getTotalPage(totalCount, limit), page);
  const option: FindAllCategoryProps = setAllByCategoryOption(category, page, limit, flag);
  const wishSet = new Set(await WishRepository.findWishByUserId(userId));
  const goodsSellCountAverage = await GoodsRepository.findSellCountAverage();
  const goodsList = await GoodsRepository.findAllByCategory(option);
  if (!goodsList) throw new BadRequestError(GOODS_DB_ERROR);

  goodsList.forEach((goods) => {
    goods.isWish = wishSet.has(goods.id);
    goods.isBest = goodsSellCountAverage < goods.countOfSell;
    goods.isNew = checkNewGoods(goods.createdAt);
  });

  return {
    meta: getListGoodsMeta(page, limit, totalCount),
    goods: goodsList,
  };
}

// 백오피스용 목록 조회 함수입니다, 추가적인 작업 예정 :)
async function getAllByCategory({ category, page, flag, limit, state }: GetAllByCategoryProps) {
  const totalCount = await GoodsRepository.findTotalCountByCategory(category);
  page = Math.min(getTotalPage(totalCount, limit), page);

  const option: FindAllCategoryProps = {
    category: category,
    offset: pagination.calculateOffset(page, limit),
    limit: limit,
    where: {
      state,
      stock: MoreThan(0),
    },
    order: getCategoryByFlag(flag),
    sort: getSortByFlag(flag),
  };

  const goodsList = await GoodsRepository.findAllByCategory(option);
  if (!goodsList) throw new BadRequestError(GOODS_DB_ERROR);

  const goodsSellCountAverage = await GoodsRepository.findSellCountAverage();

  goodsList.forEach((goods) => {
    goods.isBest = goodsSellCountAverage < goods.countOfSell;
    goods.isNew = checkNewGoods(goods.createdAt);
  });

  return {
    meta: getListGoodsMeta(page, limit, totalCount),
    goods: goodsList,
  };
}

function setAllByCategoryOption(category: number, page: number, limit: number, flag: string): FindAllCategoryProps {
  return {
    category: category,
    offset: pagination.calculateOffset(page, limit),
    limit: limit,
    where: {
      state: 'S',
      stock: MoreThan(0),
    },
    order: getCategoryByFlag(flag),
    sort: getSortByFlag(flag),
  };
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

function getListGoodsMeta(page: number, limit: number, totalCount: number): GoodsListMetaData {
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
