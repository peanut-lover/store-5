import { getRepository } from 'typeorm';
import { PROMOTION_DB_ERROR } from '../constants/database-error-name';
import { Promotion } from '../entity/Promotion';
import { DatabaseError } from '../errors/base.error';

async function createPromotion(imgUrl: string): Promise<Promotion> {
  try {
    const promotionRepo = getRepository(Promotion);
    return await promotionRepo.save({ imgUrl });
  } catch (err) {
    console.log(err);
    throw new DatabaseError(PROMOTION_DB_ERROR);
  }
}

export const PromotionRepository = {
  createPromotion,
};
