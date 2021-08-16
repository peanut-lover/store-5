import express from 'express';
import WishController from '../controller/wish.controller';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.post('/goods', wrapAsync(WishController.createWish));
router.delete('/goods/:goodsId', wrapAsync(WishController.deleteWish));
export default router;
