import { Review } from './../entity/Review';
import { getConnection } from 'typeorm';
import { GoodsRepository } from './../repository/goods.repository';
import { BadRequestError } from './../errors/client.error';
import { CreateReviewBody } from '../types/request/review.request';
import { isNumber, isString } from '../utils/check.primitive.type';
import { INVALID_DATA } from '../constants/client.error.name';
import { ReviewImg } from '../entity/ReviewImg';
import { ReviewRepository } from '../repository/review.repository';

const MAX_RATE = 5;
const MIN_RATE = 1;

const ALREADY_REVIEW_CREATED = '이미 리뷰를 등록하셨습니다.';

async function createReview(userId: number, body: CreateReviewBody, uploadFileUrls: string[]): Promise<Review> {
  await checkValidateCreateReview(userId, body);
  const { goodsId, contents, rate } = body;
  return await getConnection().transaction(async (transactionalEntityManager) => {
    const review = await transactionalEntityManager.save(Review, {
      rate,
      contents,
      goods: {
        id: goodsId,
      },
      user: {
        id: userId,
      },
    });
    await Promise.all(
      uploadFileUrls.map(
        async (url) => await transactionalEntityManager.save(ReviewImg, { review: { id: review.id }, url })
      )
    );
    return review;
  });
}

async function checkValidateCreateReview(userId: number, body: CreateReviewBody): Promise<void> {
  const { goodsId, contents, rate } = body;
  if (!isNumber(goodsId) || !isString(contents) || !isNumber(rate)) throw new BadRequestError(INVALID_DATA);
  if (rate < MIN_RATE || rate > MAX_RATE || contents.length < 1) throw new BadRequestError(INVALID_DATA);
  const goods = await GoodsRepository.findGoodsById(goodsId);
  if (!goods) throw new BadRequestError(INVALID_DATA);
  const review = await ReviewRepository.getReviewByIds(userId, goodsId);
  if (review) throw new BadRequestError(ALREADY_REVIEW_CREATED);
}

async function updateReview() {}
export const ReviewService = {
  createReview,
  updateReview,
};
