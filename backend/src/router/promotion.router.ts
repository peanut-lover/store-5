import express from 'express';
import wrapAsync from '../utils/wrap.async';
import { PromotionController } from '../controller/promotion.controller';
import uploadProductFiles from '../middlewares/upload.file';
import checkNumberInParams from '../middlewares/check.number.params';

const PromotionImageFieldName = 'file';

const router = express.Router();

router.post('/', uploadProductFiles.single(PromotionImageFieldName), wrapAsync(PromotionController.createPromotion));
router.get('/', wrapAsync(PromotionController.getPromotions));

// TODO: 연동 작업 마무리 되면 isAuthenticate 추가
router.post('/', uploadProductFiles.single('file'), wrapAsync(PromotionController.createPromotion));
router.delete('/:id', checkNumberInParams, wrapAsync(PromotionController.deletePromotion));

export default router;
