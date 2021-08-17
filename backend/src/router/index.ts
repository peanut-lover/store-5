import express from 'express';

import authRouter from './auth.router';
import goodsRouter from './goods.router';
import userRouter from './user.router';
import categoryRouter from './category.router';
import wishRouter from './wish.router';
import orderRouter from './order.router';
import paymentRouter from './payment.router';
import searchRouter from './search.router';
import promotionRouter from './promotion.router';
import cartRouter from './cart.router';
import deliveryRouter from './delivery.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/goods', goodsRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/wish', wishRouter);
router.use('/order', orderRouter);
router.use('/payment', paymentRouter);
router.use('/search', searchRouter);
router.use('/promotion', promotionRouter);
router.use('/cart', cartRouter);
router.use('/delivery', deliveryRouter);

export default router;
