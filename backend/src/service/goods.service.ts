import { GoodsRepository } from '../repository/goods.repository';
import { DetailGoodsResponse } from '../types/response/goods.response';

async function getDetailById(id: number): Promise<DetailGoodsResponse> {
  const data = await GoodsRepository.findGoodsDetailById({ id });
  const imgs = data?.goodsImgs.map((goodsImg) => goodsImg.url);
  const res = JSON.parse(JSON.stringify(data));
  delete res.goodsImgs;
  return { ...res, goodsImgs: imgs };
}

export const GoodsService = {
  getDetailById,
};
