import { Goods } from '../entity/Goods';
import { GoodsRepository } from '../repository/goods.repository';
import { DetailGoodsResponse } from '../types/response/goods.response';
import { FindAllCategoryProps } from '../types/Goods';
import { pagination } from '../utils/pagination';

interface PageProps {
  page: number;
  limit: number;
}

type GetAllByCategoryProps = PageProps & {
  // flag: 'best' | 'low' | 'high';
  flag: string;
  category: number;
};

type GetAllByKeywordProps = PageProps & {
  keyword: string;
};

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

async function getAllByCategory({ category, page, flag = 'new', limit }: GetAllByCategoryProps) {
  const option: FindAllCategoryProps = {
    category,
    offset: pagination.calculateOffset(page, limit),
    limit,
    order: getCategoryByFlag(flag) ?? 'createdAt',
    sort: flag === 'low' ? 'DSC' : 'ASC',
  };

  await GoodsRepository.findAllByCategory(option);
}

function getCategoryByFlag(flag: string): keyof Goods {
  return flag === 'low' || flag === 'high' ? 'price' : 'countOfSell';
}

export const GoodsService = {
  getDetailById,
  getAllByCategory,
};
