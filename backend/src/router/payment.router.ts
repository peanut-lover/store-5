import { PaymentController } from './../controller/payment.controller';
import express from 'express';
import wrapAsync from '../utils/wrap.async';
import isAuthenticate from '../middlewares/is.authenticate';

const router = express.Router();

router.get('/', wrapAsync(PaymentController.getPayments));
router.post('/', isAuthenticate, wrapAsync(PaymentController.createPayment));

export default router;
