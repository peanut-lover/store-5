import { DeliveryInfoRepository } from './../repository/delivery.info.repository';
import { INVALID_DATA } from './../constants/client.error.name';
import { GoodsImg } from './../entity/GoodsImg';
import { getConnection, MoreThan } from 'typeorm';
import { Goods } from '../entity/Goods';
import { GoodsRepository } from '../repository/goods.repository';
import {
  DetailGoodsResponse,
  GoodsListResponse,
  GoodsListMetaData,
  TaggedGoodsType,
} from '../types/response/goods.response';
import { WishRepository } from '../repository/wish.repository';
import {
  FindAllCategoryProps,
  FindAllColumnNameProps,
  FindAllKeywordProps,
  FindAllUserIdProps,
  GetAllByAdminProps,
  GetAllByCategoryProps,
  GetAllByKeywordProps,
  GetAllByUserIdProps,
} from '../types/Goods';
import { getTotalPage, pagination } from '../utils/pagination';
import { BadRequestError } from '../errors/client.error';
import { GOODS_DB_ERROR } from '../constants/database.error.name';
import { CategoryRepository } from '../repository/category.repository';
import { GoodsStateMap } from '../controller/goods.controller';
import { CreateGoodsBody, UpdateGoodsBody } from '../types/request/goods.request';
import { PaginationProps } from '../types/Pagination';
import { isBoolean, isNumber } from '../utils/check.primitive.type';
import { GoodsImgRepository } from '../repository/goods.img.repository';

const INVALID_DISCOUNT_RATE = '할인율은 0~99% 범위 내에서 가능합니다.';
const INVALID_DELIVERY_INFO = '해당 배송 정보는 없는 정보입니다.';
const MIN_DISCOUNT_RATE = 0;
const MAX_DISCOUNT_RATE = 99;

async function createGoods(body: CreateGoodsBody, uploadFileUrls: string[]): Promise<Goods> {
  await checkValidateCreateGoods(body);
  const { title, category, isGreen, price, stock, state, discountRate, deliveryInfo } = body;

  if (
    !title ||
    isGreen === undefined ||
    isNaN(body.stock) ||
    !state ||
    isNaN(body.price) ||
    isNaN(body.category) ||
    isNaN(body.deliveryInfo)
  ) {
    throw new BadRequestError(INVALID_DATA);
  }

  return await getConnection().transaction(async (transactionalEntityManager) => {
    const goods = await transactionalEntityManager.save(Goods, {
      title,
      price,
      stock,
      discountRate,
      state,
      isGreen,
      category: {
        id: category,
      },
      deliveryInfo: {
        id: deliveryInfo,
      },
      thumbnailUrl: uploadFileUrls[0],
    });

    await Promise.all(
      uploadFileUrls.map(
        async (url) => await transactionalEntityManager.save(GoodsImg, { goods: { id: goods.id }, url })
      )
    );

    return goods;
  });
}

async function updateGoods(body: UpdateGoodsBody, goodsId: number, uploadFileUrls: string[]): Promise<Goods> {
  await checkValidateCreateGoods(body);
  const { title, category, isGreen, price, stock, state, discountRate, deliveryInfo, oldImages } = body;

  if (
    !title ||
    isGreen === undefined ||
    isNaN(body.stock) ||
    !state ||
    isNaN(body.price) ||
    isNaN(body.category) ||
    isNaN(body.deliveryInfo)
  ) {
    throw new BadRequestError(INVALID_DATA);
  }

  return await getConnection().transaction(async (transactionalEntityManager) => {
    const goods = await transactionalEntityManager.save(Goods, {
      id: goodsId,
      title,
      price,
      stock,
      discountRate,
      state,
      isGreen,
      category: {
        id: category,
      },
      deliveryInfo: {
        id: deliveryInfo,
      },
      thumbnailUrl: uploadFileUrls[0],
    });

    if (oldImages) {
      const imgIds = oldImages ? oldImages.split(',').map((img) => Number(img)) : [];
      await GoodsImgRepository.deleteGoodsImgByNotInImgIds(transactionalEntityManager, goodsId, imgIds);
    } else {
      await GoodsImgRepository.deleteGoodsImgByGoodsId(transactionalEntityManager, goodsId);
    }

    await Promise.all(
      uploadFileUrls.map(
        async (url) => await transactionalEntityManager.save(GoodsImg, { goods: { id: goods.id }, url })
      )
    );

    return goods;
  });
}

// 비회원은 isWish를 확인하지 않습니다.
async function getDetailById(goodsId: number, userId?: number): Promise<DetailGoodsResponse> {
  const data = await GoodsRepository.findGoodsDetailById(goodsId);
  const imgs = data?.goodsImgs.map((goodsImg) => goodsImg.url);
  const res = JSON.parse(JSON.stringify(data));
  delete res.goodsImgs;
  if (data && userId) {
    res.isWish = (await WishRepository.findWishCountByGoodsIdAndUserId(goodsId, userId)) > 0;
  }
  return { ...res, goodsImgs: imgs };
}

async function getAllSaleGoodsByCategory({
  categoryName,
  page,
  flag,
  limit,
  userId,
}: GetAllByCategoryProps): Promise<GoodsListResponse> {
  // TODO: 함수로 빼도 될듯?
  const category = await CategoryRepository.getCategoryByName(categoryName);
  if (!category) throw new BadRequestError(GOODS_DB_ERROR);
  const totalCount = await GoodsRepository.findTotalCountByCategory(category.id);
  page = Math.min(getTotalPage(totalCount, limit), page);
  const option: FindAllCategoryProps = setAllByCategoryOption(category.id, page, limit, flag);
  const wishSet = userId && new Set(await WishRepository.findWishByUserId(userId));
  const goodsSellCountAverage = await GoodsRepository.findSellCountAverage();
  const goodsList = await GoodsRepository.findAllByCategory(option);
  if (!goodsList) throw new BadRequestError(GOODS_DB_ERROR);

  goodsList.forEach((goods) => {
    if (wishSet) goods.isWish = wishSet.has(goods.id);
    goods.isBest = goodsSellCountAverage < goods.countOfSell;
    goods.isNew = isNewGoods(goods.createdAt);
  });

  return {
    meta: getListGoodsMeta(page, limit, totalCount),
    goodsList,
  };
}

async function getAllSaleGoodsByKeyword({
  keyword,
  page,
  limit,
  userId,
}: GetAllByKeywordProps): Promise<GoodsListResponse> {
  const totalCount = await GoodsRepository.findTotalCountByKeyword(keyword);
  page = Math.min(getTotalPage(totalCount, limit), page);

  const option: FindAllKeywordProps = {
    keyword,
    offset: pagination.calculateOffset(page, limit),
    limit,
  };

  const wishSet = userId && new Set(await WishRepository.findWishByUserId(userId));
  const goodsSellCountAverage = await GoodsRepository.findSellCountAverage();
  const goodsList = await GoodsRepository.findAllByKeyword(option);
  if (!goodsList) throw new BadRequestError(GOODS_DB_ERROR);

  goodsList.forEach((goods) => {
    if (wishSet) goods.isWish = wishSet.has(goods.id);
    goods.isBest = goodsSellCountAverage < goods.countOfSell;
    goods.isNew = isNewGoods(goods.createdAt);
  });

  return {
    meta: getListGoodsMeta(page, limit, totalCount),
    goodsList,
  };
}

async function getAllGoodsByUserId({ page, limit, userId }: GetAllByUserIdProps): Promise<GoodsListResponse> {
  const totalCount = await WishRepository.findWishCountByUserId(userId);
  page = Math.min(getTotalPage(totalCount, limit), page);

  const option: FindAllUserIdProps = {
    offset: pagination.calculateOffset(page, limit),
    limit,
    userId,
  };

  const wishSet = new Set(await WishRepository.findWishByUserId(userId));
  const goodsSellCountAverage = await GoodsRepository.findSellCountAverage();
  const goodsList = await GoodsRepository.findAllWishByUserId(option);
  if (!goodsList) throw new BadRequestError(GOODS_DB_ERROR);

  goodsList.forEach((goods) => {
    if (wishSet) goods.isWish = wishSet.has(goods.id);
    goods.isBest = goodsSellCountAverage < goods.countOfSell;
    goods.isNew = isNewGoods(goods.createdAt);
  });

  return {
    meta: getListGoodsMeta(page, limit, totalCount),
    goodsList,
  };
}

// TODO: 각 조회를 하나의 함수로 분리?
async function getMainGoodsListMap(userId?: number): Promise<{
  bestGoodsList: TaggedGoodsType[];
  latestGoodsList: TaggedGoodsType[];
  discountGoodsList: TaggedGoodsType[];
}> {
  const bestProps: FindAllColumnNameProps = {
    columnName: 'countOfSell',
    limit: 4,
  };
  const latestProps: FindAllColumnNameProps = {
    columnName: 'createdAt',
    limit: 8,
  };
  const discountProps: FindAllColumnNameProps = {
    columnName: 'discountRate',
    limit: 8,
  };

  const bestGoodsList = await GoodsRepository.findAllByColumnName(bestProps);
  const latestGoodsList = await GoodsRepository.findAllByColumnName(latestProps);
  const discountGoodsList = await GoodsRepository.findAllByColumnName(discountProps);
  if (userId) {
    const wishSet = new Set(await WishRepository.findWishByUserId(userId));
    if (wishSet) {
      bestGoodsList.forEach((goods) => (goods.isWish = wishSet.has(goods.id)));
      latestGoodsList.forEach((goods) => (goods.isWish = wishSet.has(goods.id)));
      discountGoodsList.forEach((goods) => (goods.isWish = wishSet.has(goods.id)));
    }
  }
  return {
    bestGoodsList,
    latestGoodsList,
    discountGoodsList,
  };
}

// TODO: keyword, order, sort
async function getGoodsForAdmin(page: number, limit: number, keyword?: string, order?: string, sort?: string) {
  const totalCount = await GoodsRepository.findTotalCount();
  const newPage = Math.min(getTotalPage(totalCount, limit), page);

  const option: PaginationProps = {
    offset: pagination.calculateOffset(newPage, limit),
    limit,
  };
  const goodsList = await GoodsRepository.findAllByOption(option);
  if (!goodsList) throw new BadRequestError(GOODS_DB_ERROR);

  return {
    meta: getListGoodsMeta(newPage, limit, totalCount),
    goodsList,
  };
}

async function getGoodsStockById(goodsId: number): Promise<number> {
  return await GoodsRepository.findStockById(goodsId);
}

async function getGoodsImgById(goodsId: number): Promise<
  {
    url: string;
    id: number;
  }[]
> {
  const goodsImgs = await GoodsImgRepository.findGoodsImgById(goodsId);
  return goodsImgs.map((goodsImg) => ({
    id: goodsImg.id,
    url: goodsImg.url,
  }));
}

function setAllByCategoryOption(category: number, page: number, limit: number, flag: string): FindAllCategoryProps {
  return {
    category: category,
    offset: pagination.calculateOffset(page, limit),
    limit: limit,
    where: {
      state: GoodsStateMap.sale,
      stock: MoreThan(0),
    },
    order: getCategoryByFlag(flag),
    sort: getSortByFlag(flag),
  };
}

function getCategoryByFlag(flag: string): keyof Goods {
  switch (flag) {
    case 'low':
    case 'high':
      return 'price';
    case 'best':
      return 'countOfSell';
    case 'latest':
      return 'createdAt';
    default:
      return 'createdAt';
  }
}

function getSortByFlag(flag: string): 'DESC' | 'ASC' {
  return flag === 'low' ? 'ASC' : 'DESC';
}

function isNewGoods(date: Date): boolean {
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

async function checkValidateCreateGoods(body: CreateGoodsBody): Promise<void> {
  const { title, category, isGreen, price, stock, state, discountRate, deliveryInfo } = body;
  if (!title || !state) throw new BadRequestError(INVALID_DATA);

  if (!isBoolean(isGreen)) throw new BadRequestError(INVALID_DATA);

  if (!isNumber(category) || !isNumber(price) || !isNumber(stock) || !isNumber(deliveryInfo))
    throw new BadRequestError(INVALID_DATA);

  if (discountRate < MIN_DISCOUNT_RATE || discountRate > MAX_DISCOUNT_RATE)
    throw new BadRequestError(INVALID_DISCOUNT_RATE);

  const foundDeliveryInfo = await DeliveryInfoRepository.getDeliveryInfoById(deliveryInfo);
  if (!foundDeliveryInfo) throw new BadRequestError(INVALID_DELIVERY_INFO);
}

export const GoodsService = {
  createGoods,
  updateGoods,
  getDetailById,
  getGoodsForAdmin,
  getAllSaleGoodsByKeyword,
  getAllSaleGoodsByCategory,
  getAllGoodsByUserId,
  getMainGoodsListMap,
  getGoodsStockById,
  getGoodsImgById,
};
