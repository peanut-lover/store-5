import { GoodsRepository } from '../repository/goods.repository';

async function getDetailById(id: number) {
  const data = await GoodsRepository.findGoodsDetailById({ id });
  const imgs = data?.goodsImgs.map((goodsImg) => goodsImg.url);

  return { ...data, goodsImgs: imgs };
}

export const GoodsService = {
  getDetailById,
};
