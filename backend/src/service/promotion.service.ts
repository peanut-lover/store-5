import { GoodsRepository } from './../repository/goods.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BadRequestError } from '../errors/client.error';
import { PromotionRepository } from '../repository/promotion.repository';
import { CreatePromotionBody } from '../types/request/promotion.request';
import { PromotionChartResponse, PromotionResponse } from '../types/response/promotion.response';

const PROMOTION_PARAMETER_ERROR = '프로모션을 등록하기위해서 imgUrl 값은 필수입니다.';
const PROMOTION_GOODS_ERROR = '프로모션을 진행하려는 해당 상품은 존재하지 않는 상품입니다.';
const PROMOTION_COUNT_ERROR = '등록가능한 최대 갯수를 초과하여 프로모션을 등록할 수 없습니다.';

const PROMOTION_ITEM_LIMIT = 10;

async function createPromotion(body: CreatePromotionBody, imgUrl: string): Promise<PromotionResponse> {
  await checkValidateCreatePromotion(body, imgUrl);
  const count = await PromotionRepository.getPromotionTotalCount();
  if (PROMOTION_ITEM_LIMIT === count) throw new BadRequestError(PROMOTION_COUNT_ERROR);
  const { goodsId } = body;
  const newPromotion = await PromotionRepository.createPromotion(goodsId, imgUrl);
  return {
    id: newPromotion.id,
    imgUrl: newPromotion.imgUrl,
  };
}

async function getPromotions(): Promise<PromotionResponse[]> {
  const promotions = await PromotionRepository.getPromotions();
  const result = promotions.map((promotion) => {
    return { id: promotion.id, imgUrl: promotion.imgUrl, goodsId: promotion.goods.id };
  });
  return result;
}

async function deletePromotion(promotionId: number): Promise<DeleteResult> {
  return await PromotionRepository.deletePromotion(promotionId);
}

async function increasePromotionView(promotionId: number): Promise<UpdateResult> {
  return await PromotionRepository.increasePromotionView(promotionId);
}

async function checkValidateCreatePromotion(body: CreatePromotionBody, imgUrl: string): Promise<void> {
  const { goodsId } = body;
  const foundGoods = await GoodsRepository.getGoodsById(goodsId);
  if (!foundGoods) throw new BadRequestError(PROMOTION_GOODS_ERROR);
  if (!imgUrl) throw new BadRequestError(PROMOTION_PARAMETER_ERROR);
}

async function getPromotionChartData(): Promise<PromotionChartResponse[]> {
  const promotions = await PromotionRepository.getPromotionChartData();
  return promotions.map(({ id, imgUrl, view, goods }) => ({
    id,
    imgUrl,
    view,
    goodsId: goods.id,
    title: goods.title,
  }));
}

export const PromotionService = {
  createPromotion,
  getPromotions,
  getPromotionChartData,
  deletePromotion,
  increasePromotionView,
};
