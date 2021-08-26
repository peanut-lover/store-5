import { uploadProductImages } from './../utils/aws.upload';
import { INVALID_DATA } from './../constants/client.error.name';
import { BadRequestError } from './../errors/client.error';
import { ReviewService } from './../service/review.service';
import { Request, Response } from 'express';
import {
  CreateReviewBody,
  CreateReviewRequest,
  UpdateReviewBody,
  UpdateReviewRequest,
} from '../types/request/review.request';

async function getReviews(req: Request, res: Response) {
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const goodsId = Number(req.query.goodsId);
  const userId = Number(req.query.userId);
  const requestUserId = req.session.userId;

  if (isNaN(limit) || isNaN(page)) {
    throw new BadRequestError(INVALID_DATA);
  }

  const option = {
    limit,
    page,
    requestUserId,
  };
  if (!isNaN(goodsId)) Object.assign(option, { goodsId });
  if (!isNaN(userId)) Object.assign(option, { userId });

  const result = await ReviewService.getReviews(option);
  res.status(200).json({ result });
}

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

async function updateReview(req: UpdateReviewRequest, res: Response) {
  const { goodsId, rate, contents, deletedImages } = req.body;
  const reviewId = Number(req.params.id);
  const userId = req.userId;
  const body: UpdateReviewBody = {
    goodsId: Number(goodsId),
    rate: Number(rate),
    contents,
    deletedImages,
  };
  let uploadFileUrls: string[] = [];
  const files = req.files;
  if (files && Array.isArray(files)) {
    uploadFileUrls = await uploadProductImages(files);
  }

  const result = await ReviewService.updateReview(userId, body, reviewId, uploadFileUrls);
  res.status(200).json({ result });
}

async function deleteReview(req: Request, res: Response) {
  const reviewId = Number(req.params.id);
  const userId = req.userId;

  if (isNaN(reviewId)) {
    throw new BadRequestError(INVALID_DATA);
  }

  await ReviewService.deleteReview(userId, reviewId);
  res.sendStatus(204);
}

export const ReviewController = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
