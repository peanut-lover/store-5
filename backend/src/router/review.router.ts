import { ReviewController } from './../controller/review.controller';
import express from 'express';
import wrapAsync from '../utils/wrap.async';
import uploadProductFiles from '../middlewares/upload.file';
import isAuthenticate from '../middlewares/is.authenticate';

const REVIEW_MAX_IMAGE = 5;
const ReviewImageFieldName = 'files';

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  uploadProductFiles.array(ReviewImageFieldName, REVIEW_MAX_IMAGE),
  wrapAsync(ReviewController.createReview)
);

router.put(
  '/',
  isAuthenticate,
  uploadProductFiles.array(ReviewImageFieldName, REVIEW_MAX_IMAGE),
  wrapAsync(ReviewController.updateReview)
);

export default router;
