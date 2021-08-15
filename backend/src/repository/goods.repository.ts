import { getRepository } from 'typeorm';
import { GOODS_DB_ERROR } from '../constants/database-error-name';
import { DatabaseError } from '../errors/base.error';
import { Goods } from '../entity/Goods';

async function findGoodsDetailById({ id }: { id: number }) {
  try {
    const result = await getRepository(Goods).findOne({
      relations: ['category', 'deliveryInfo', 'goodsImgs'],
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

export const GoodsRepository = {
  findGoodsDetailById,
};
