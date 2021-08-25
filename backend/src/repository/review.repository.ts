import { getRepository } from 'typeorm';
import { REVIEW_DB_ERROR } from '../constants/database.error.name';
import { Review } from '../entity/Review';
import { DatabaseError } from '../errors/base.error';
import { getReviewsOption } from '../types/Review';

async function getReviews({ limit, page, goodsId, userId }: getReviewsOption) {
  try {
    return await getRepository(Review).find({
      skip: limit * (page - 1),
      take: limit,
      where: {
        ...(goodsId && { goods: { id: goodsId } }),
        ...(userId && { user: { id: userId } }),
      },
      order: {
        id: 'DESC',
      },
      relations: ['goods', 'user', 'reviewImgs'],
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(REVIEW_DB_ERROR);
  }
}

async function getReviewsCount({ limit, page, goodsId, userId }: getReviewsOption) {
  try {
    return await getRepository(Review).count({
      ...(goodsId && { goods: { id: goodsId } }),
      ...(userId && { user: { id: userId } }),
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(REVIEW_DB_ERROR);
  }
}

async function getReviewById(reviewId: number) {
  try {
    return getRepository(Review).findOne({
      relations: ['user'],
      where: {
        id: reviewId,
      },
    });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(REVIEW_DB_ERROR);
  }
}

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

async function deleteReview(reviewId: number) {
  try {
    await getRepository(Review).delete({ id: reviewId });
  } catch (err) {
    console.error(err);
    throw new DatabaseError(REVIEW_DB_ERROR);
  }
}

export const ReviewRepository = {
  getReviews,
  getReviewsCount,
  getReviewById,
  getReviewByIds,
  deleteReview,
};
