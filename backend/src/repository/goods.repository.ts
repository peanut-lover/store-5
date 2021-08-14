import { getRepository } from 'typeorm';
import { GOODS_DB_ERROR } from '../constants/database-error-name';
import { Goods } from '../entity/Goods';
import { DatabaseError } from '../errors/base.error';

async function findGoodsDetailById({ id }: { id: number }) {
  try {
    const result = await getRepository(Goods).findOne({
      relations: ['category', 'goodsImgs'],
      where: {
        id,
      },
    });
    console.log(result);
  } catch (error) {
    console.error(error);
    throw new DatabaseError(GOODS_DB_ERROR);
  }
}

export const GoodsRepository = {
  findGoodsDetailById,
};
