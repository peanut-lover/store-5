import { OrderController } from './../controller/order.controller';
import express from 'express';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/', wrapAsync(OrderController.getOrders));
router.post('/', wrapAsync(OrderController.createOrder));

export default router;
