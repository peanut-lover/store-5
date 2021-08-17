import express from 'express';
import wrapAsync from '../utils/wrap-async';
import { PromotionController } from '../controller/promotion.controller';

const router = express.Router();

router.post('/', wrapAsync(PromotionController.createPromotion));
router.get('/', wrapAsync(PromotionController.getPromotions));
export default router;
