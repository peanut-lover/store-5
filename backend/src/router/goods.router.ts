import express from 'express';
import { GoodsController } from '../controller/goods.controller';
import checkNumberInParams from '../middlewares/check-number-params';
import setGoodsListFromParams from '../middlewares/list.middleware';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/category', setGoodsListFromParams, wrapAsync(GoodsController.getAllGoodsCategory));
router.get('/:id', checkNumberInParams, wrapAsync(GoodsController.getGoodsDetail));

export default router;
