import express from 'express';
import wrapAsync from '../utils/wrap-async';
import { PromotionController } from '../controller/promotion.controller';

const router = express.Router();

router.post('/', wrapAsync(PromotionController.createPromotion));

export default router;
