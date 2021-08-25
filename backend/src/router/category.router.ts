import express from 'express';
import CategoryController from '../controller/category.controller';
import wrapAsync from '../utils/wrap.async';

const router = express.Router();

router.get('/', wrapAsync(CategoryController.getAllCategory));
router.post('/', wrapAsync(CategoryController.createCategory));
router.get('/dashboard/count', wrapAsync(CategoryController.getCategoryCounts));
router.get('/dashboard/sell', wrapAsync(CategoryController.getTopSellingCategory));
router.get('/dashboard/view', wrapAsync(CategoryController.getCategoryViews));

export default router;
