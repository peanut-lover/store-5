import express from 'express';
import wrapAsync from '../utils/wrap-async';
import { PromotionController } from '../controller/promotion.controller';
import uploadProductFiles from '../middlewares/upload-file';

const router = express.Router();

router.post('/', uploadProductFiles.single('file'), wrapAsync(PromotionController.createPromotion));
router.get('/', wrapAsync(PromotionController.getPromotions));
export default router;
