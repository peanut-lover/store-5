import express from 'express';
import { GoodsController } from '../controller/goods.controller';
import checkNumberInParams from '../middlewares/check-number-params';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/category', wrapAsync(GoodsController.getAllGoodsCategory));
router.get('/keyword', wrapAsync(GoodsController.getAllSaleGoodsByKeyword));
router.get('/main', wrapAsync(GoodsController.getMainGoodsListMap));
router.get('/:id', checkNumberInParams, wrapAsync(GoodsController.getGoodsDetail));

export default router;
