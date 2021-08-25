import { ReviewController } from './../controller/review.controller';
import express from 'express';
import wrapAsync from '../utils/wrap.async';
import uploadProductFiles from '../middlewares/upload.file';
import isAuthenticate from '../middlewares/is.authenticate';

const REVIEW_MAX_IMAGE = 5;
const ReviewImageFieldName = 'files';

const router = express.Router();

router.get('/', wrapAsync(ReviewController.getReviews));

router.post(
  '/',
  isAuthenticate,
  uploadProductFiles.array(ReviewImageFieldName, REVIEW_MAX_IMAGE),
  wrapAsync(ReviewController.createReview)
);

router.put(
  '/:id',
  isAuthenticate,
  uploadProductFiles.array(ReviewImageFieldName, REVIEW_MAX_IMAGE),
  wrapAsync(ReviewController.updateReview)
);

router.delete('/:id', isAuthenticate, wrapAsync(ReviewController.deleteReview));

export default router;
