import express from 'express';
import { MAX_UPLOAD_FILE } from '../constants/product.default.value';
import { GoodsController } from '../controller/goods.controller';
import checkNumberInParams from '../middlewares/check.number.params';
import isAuthenticate from '../middlewares/is.authenticate';
import uploadProductFiles from '../middlewares/upload.file';
import wrapAsync from '../utils/wrap.async';

const router = express.Router();

const GoodsImageFieldName = 'files';

router.post(
  '/',
  uploadProductFiles.array(GoodsImageFieldName, MAX_UPLOAD_FILE),
  wrapAsync(GoodsController.createGoods)
);

router.patch(
  '/:id',
  checkNumberInParams,
  uploadProductFiles.array(GoodsImageFieldName, MAX_UPLOAD_FILE),
  wrapAsync(GoodsController.updateGoods)
);

// TODO: isAuthenticate middleware
router.get('/admin', wrapAsync(GoodsController.getAllGoodsForAdmin));
router.get('/category', wrapAsync(GoodsController.getAllGoodsForClient));
router.get('/keyword', wrapAsync(GoodsController.getAllGoodsForClient));
router.get('/main', wrapAsync(GoodsController.getMainGoodsListMap));
router.get('/:id/stock', checkNumberInParams, wrapAsync(GoodsController.getGoodsStockById));
router.get('/:id/img', checkNumberInParams, wrapAsync(GoodsController.getGoodsImgById));
router.get('/:id', checkNumberInParams, wrapAsync(GoodsController.getGoodsDetail));

// TODO: 연동 작업 마무리 되면 isAuthenticate 추가
router.delete('/:id', checkNumberInParams, wrapAsync(GoodsController.deleteGoods));

// TODO: dashboard admin?
router.get('/dashboard/best', wrapAsync(GoodsController.getBestGoodsForDashboard));

export default router;
