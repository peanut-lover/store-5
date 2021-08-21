import express from 'express';
import { MAX_UPLOAD_FILE } from '../constants/product-default-value';
import { GoodsController } from '../controller/goods.controller';
import checkNumberInParams from '../middlewares/check-number-params';

import uploadProductFiles from '../middlewares/upload-file';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

const GoodsImageFieldName = 'files';

router.post(
  '/',
  uploadProductFiles.array(GoodsImageFieldName, MAX_UPLOAD_FILE),
  wrapAsync(GoodsController.createGoods)
);

// TODO: isAuthenticate middleware
router.get('/admin', wrapAsync(GoodsController.getGoodsForAdmin));
router.get('/category', wrapAsync(GoodsController.getAllGoodsCategory));
router.get('/keyword', wrapAsync(GoodsController.getAllSaleGoodsByKeyword));
router.get('/main', wrapAsync(GoodsController.getMainGoodsListMap));
router.get('/:id/stock', checkNumberInParams, wrapAsync(GoodsController.getGoodsStockById));
router.get('/:id', checkNumberInParams, wrapAsync(GoodsController.getGoodsDetail));

export default router;
