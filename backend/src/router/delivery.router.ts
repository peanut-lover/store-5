import { DeliveryController } from './../controller/delivery.controller';
import express from 'express';
import isAuthenticate from '../middlewares/is.authenticate';
import wrapAsync from '../utils/wrap.async';

const router = express.Router();

// router.get('/', isAuthenticate, wrapAsync(DeliveryController.getDeliveryInfos));
router.get('/', wrapAsync(DeliveryController.getDeliveryInfos));
router.post('/', isAuthenticate, wrapAsync(DeliveryController.createDeliveryInfo));

export default router;
