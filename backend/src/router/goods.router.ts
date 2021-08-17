import express from 'express';
import { GoodsController } from '../controller/goods.controller';
import checkNumberInParams from '../middlewares/check-number-params';
import isAuthenticate from '../middlewares/is-authenticate';
import uploadProductFiles from '../middlewares/upload-file';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.post('/', uploadProductFiles.array('files'), wrapAsync(GoodsController.createGoods));

// router.post('/', isAuthenticate, uploadProductFiles.array('files'), wrapAsync(GoodsController.createGoods));
router.get('/category', wrapAsync(GoodsController.getAllGoodsCategory));
router.get('/keyword', wrapAsync(GoodsController.getAllSaleGoodsByKeyword));
router.get('/main', wrapAsync(GoodsController.getMainGoodsListMap));
router.get('/:id', checkNumberInParams, wrapAsync(GoodsController.getGoodsDetail));

export default router;
