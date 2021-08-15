import { DeliveryInfo } from './../entity/DeliveryInfo';
import { Goods } from '../entity/Goods';
import { GoodsRepository } from '../repository/goods.repository';

type GoodsDetail = Goods & {
  goodsImgs: string[] | undefined;
  deliveryInfo: DeliveryInfo;
};

async function getDetailById(id: number): Promise<GoodsDetail> {
  const data = await GoodsRepository.findGoodsDetailById({ id });
  const imgs = data?.goodsImgs.map((goodsImg) => goodsImg.url);
  const res = JSON.parse(JSON.stringify(data));
  delete res.goodsImgs;
  return { ...res, goodsImgs: imgs };
}

export const GoodsService = {
  getDetailById,
};
