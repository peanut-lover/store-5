import { EntityManager, getRepository, In, Not } from 'typeorm';
import { GoodsImg } from '../entity/GoodsImg';

async function findGoodsImgById(goodsId: number): Promise<GoodsImg[]> {
  const goodsImgRepo = getRepository(GoodsImg);
  return await goodsImgRepo.find({
    where: { goods: goodsId },
  });
}

async function deleteGoodsImgByNotInImgIds(transactionalEntityManager: EntityManager, imgIds: number[]) {
  return await transactionalEntityManager.delete(GoodsImg, {
    id: Not(In(imgIds)),
  });
}

async function deleteGoodsImgByGoodsId(transactionalEntityManager: EntityManager, goodsId: number) {
  return await transactionalEntityManager.delete(GoodsImg, {
    goods: { id: goodsId },
  });
}

export const GoodsImgRepository = {
  findGoodsImgById,
  deleteGoodsImgByNotInImgIds,
  deleteGoodsImgByGoodsId,
};
