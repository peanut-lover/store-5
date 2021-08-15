import express from 'express';
import { CategoryController } from '../controller/category.controller';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

// router.get('/', wrapAsync(CategoryController.)) TODO: Get ALL 카테고리 연동
router.post('/sub', wrapAsync(CategoryController.createSubCategory));
