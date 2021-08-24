import { OrderController } from './../controller/order.controller';
import express from 'express';
import wrapAsync from '../utils/wrap.async';
import isAuthenticate from '../middlewares/is.authenticate';

const router = express.Router();

router.get('/', isAuthenticate, wrapAsync(OrderController.getOwnOrdersPagination));
router.post('/', isAuthenticate, wrapAsync(OrderController.createOrder));

// 관리자 전용 API. TODO: 추후 관리자 권한 미들웨어 추가하기
router.get('/admin', wrapAsync(OrderController.getAllOrdersPagination));

export default router;
