import { getRepository } from 'typeorm';
import { WISH_DB_ERROR } from '../constants/database-error-name';
import { Wish } from '../entity/Wish';
import { DatabaseError } from '../errors/base.error';

async function findWishByUserId(userId: number): Promise<number[]> {
  try {
    const result = await getRepository(Wish)
      .createQueryBuilder('wish')
      .select('wish.goodsId')
      .where('wish.userId = :userId', { userId })
      .getMany();

    return result.map((wish) => wish.goodsId);
  } catch (error) {
    console.error(error);
    throw new DatabaseError(WISH_DB_ERROR);
  }
}

export const WishRepository = {
  findWishByUserId,
};
