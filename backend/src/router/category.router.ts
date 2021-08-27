import express from 'express';
import CategoryController from '../controller/category.controller';
import wrapAsync from '../utils/wrap.async';
import checkNumberInParams from '../middlewares/check.number.params';

const router = express.Router();

router.get('/', wrapAsync(CategoryController.getAllCategory));
router.get('/goods/:id', checkNumberInParams, wrapAsync(CategoryController.getCategoryByGoodsId));
router.post('/', wrapAsync(CategoryController.createCategory));
router.get('/dashboard/count', wrapAsync(CategoryController.getCategoryGoodsCounts));
router.get('/dashboard/sell', wrapAsync(CategoryController.getTopSellingCategory));
router.get('/dashboard/view', wrapAsync(CategoryController.getCategoryViews));

export default router;
