import { MoreThan } from 'typeorm';
import { Goods } from '../entity/Goods';
import { GoodsRepository } from '../repository/goods.repository';
import { DetailGoodsResponse } from '../types/response/goods.response';
import { FindAllCategoryProps, GetAllByCategoryProps } from '../types/Goods';
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

async function getAllByCategoryInSalesState({ category, page, flag, limit, userId }: GetAllByCategoryProps) {
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

  if (userId) return await GoodsRepository.findAllByCategoryInLogined(option);
  else return await GoodsRepository.findAllByCategory(option);
}

function getCategoryByFlag(flag: string): keyof Goods {
  return flag === 'low' || flag === 'high' ? 'price' : 'countOfSell';
}

function getSortByFlag(flag: string): 'DESC' | 'ASC' {
  return flag === 'high' || flag === 'best' ? 'DESC' : 'ASC';
}

export const GoodsService = {
  getDetailById,
  getAllByCategory,
  getAllByCategoryInSalesState,
};
