import { getRepository } from 'typeorm';
import { GOODS_DB_ERROR } from '../constants/database-error-name';
import { Goods } from '../entity/Goods';
import { DatabaseError } from '../errors/base.error';
import { CreateGoodsRequest } from '../types/request/goods.request';

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

// async function createGoods(requestGoods: CreateGoodsRequest) {
//   const goodsRepo = getRepository(Goods);
//   const { title, price, stock, discountRate, state } = requestGoods;
//   const goods = await goodsRepo.create({
//     thumbnailUrl: 'as',
//     countOfSell: 123,
//     isGreen: false,
//     title: 'asd',
//     price: 300,
//     stock: 100,
//     discountRate: 10,
//     state: 'S',
//   });
// }

export const GoodsRepository = {
  findGoodsDetailById,
};
