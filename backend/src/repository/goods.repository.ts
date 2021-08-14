import { getRepository } from 'typeorm';
import { Goods } from '../entity/Goods';

async function findGoodsDetailById({ id }: { id: number }) {
  const goodsRepo = getRepository(Goods);
  goodsRepo.find();
}

export const GoodsRepository = {
  findGoodsDetailById,
};
