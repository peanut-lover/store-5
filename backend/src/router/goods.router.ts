import express from 'express';
import { GoodsController } from '../controller/goods.controller';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/:id', wrapAsync(GoodsController.getGoodsDetail));

export default router;