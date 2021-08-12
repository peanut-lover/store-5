import express from 'express';

import authRouter from './auth.router';
import isAuthenticate from '../middlewares/is-authenticate';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
