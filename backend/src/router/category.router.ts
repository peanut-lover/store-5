import express from 'express';
import CategoryController from '../controller/category.controller';
import wrapAsync from '../utils/wrap.async';

const router = express.Router();

router.get('/', wrapAsync(CategoryController.getAllCategory));
router.post('/', wrapAsync(CategoryController.createCategory));
router.get('/admin/dashboard', wrapAsync(CategoryController.getParentCategoryCount));

export default router;
