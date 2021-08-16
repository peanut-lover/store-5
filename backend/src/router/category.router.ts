import express from 'express';
import CategoryController from '../controller/category.controller';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/', wrapAsync(CategoryController.getAllCategory));
router.post('/', wrapAsync(CategoryController.createCategory));
export default router;
