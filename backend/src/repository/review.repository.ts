import { getRepository } from 'typeorm';
import { REVIEW_DB_ERROR } from '../constants/database.error.name';
import { Review } from '../entity/Review';
import { DatabaseError } from '../errors/base.error';

async function getReviewByIds(userId: number, goodsId: number) {
  try {
    return getRepository(Review).findOne({
      where: {
        user: { id: userId },
        goods: { id: goodsId },
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(REVIEW_DB_ERROR);
  }
}

export const ReviewRepository = {
  getReviewByIds,
};
