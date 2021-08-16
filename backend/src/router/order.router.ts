import { OrderController } from './../controller/order.controller';
import express from 'express';
import wrapAsync from '../utils/wrap-async';
import isAuthenticate from '../middlewares/is-authenticate';

const router = express.Router();

router.get('/', isAuthenticate, wrapAsync(OrderController.getOrders));
router.post('/', isAuthenticate, wrapAsync(OrderController.createOrder));

export default router;
