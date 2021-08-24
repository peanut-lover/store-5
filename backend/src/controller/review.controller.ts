import { uploadProductImages } from './../utils/aws.upload';
import { INVALID_DATA } from './../constants/client.error.name';
import { BadRequestError } from './../errors/client.error';
import { ReviewService } from './../service/review.service';
import { Request, Response } from 'express';
import { CreateReviewBody, CreateReviewRequest } from '../types/request/review.request';

async function createReview(req: CreateReviewRequest, res: Response) {
  const { goodsId, rate, contents } = req.body;
  const userId = req.userId;
  const body: CreateReviewBody = {
    goodsId: Number(goodsId),
    rate: Number(rate),
    contents,
  };
  const files = req.files;
  if (!files || !Array.isArray(files)) throw new BadRequestError(INVALID_DATA);

  const uploadFileUrls = await uploadProductImages(files);
  const result = await ReviewService.createReview(userId, body, uploadFileUrls);
  res.status(201).json({ result });
}

// async function updateReview(req:Request, res:Response) {

// }

export const ReviewController = {
  createReview,
};
