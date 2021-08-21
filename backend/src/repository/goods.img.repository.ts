import { getRepository } from 'typeorm';
import { GoodsImg } from '../entity/GoodsImg';

async function findGoodsImgById(goodsId: number): Promise<GoodsImg[]> {
  const goodsImgRepo = getRepository(GoodsImg);
  return await goodsImgRepo.find({
    where: { goods: goodsId },
  });
}

export const GoodsImgRepository = {
  findGoodsImgById,
};
