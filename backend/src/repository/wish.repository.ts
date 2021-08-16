import { DeleteResult, getRepository } from 'typeorm';
import { USER_ADDRESS_DB_ERROR, WISH_DB_ERROR } from '../constants/database-error-name';
import { Wish } from '../entity/Wish';
import { DatabaseError } from '../errors/base.error';

async function findWishByIds(userId: number, wishId: number): Promise<Wish | undefined> {
  try {
    const wishRepo = getRepository(Wish);
    return await wishRepo.findOne({ where: { id: wishId, user: userId } });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function createWish(userId: number, goodsId: number): Promise<Wish> {
  try {
    const wishRepo = getRepository(Wish);
    const wish = await wishRepo.save({ userId, goodsId });
    return wish;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

async function deleteWish(wishId: number): Promise<DeleteResult> {
  try {
    const wishRepo = getRepository(Wish);
    return await wishRepo.delete({ id: wishId });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_ADDRESS_DB_ERROR);
  }
}

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
  findWishByIds,
  createWish,
  deleteWish,
};
