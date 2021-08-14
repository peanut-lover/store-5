import express from 'express';

import authRouter from './auth.router';
import goodsRouter from './goods.router';
import isAuthenticate from '../middlewares/is-authenticate';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/goods', goodsRouter);
export default router;
