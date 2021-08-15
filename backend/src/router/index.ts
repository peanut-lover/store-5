import express from 'express';

import authRouter from './auth.router';
import goodsRouter from './goods.router';
import userRouter from './user.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/goods', goodsRouter);
router.use('/user', userRouter);

export default router;
