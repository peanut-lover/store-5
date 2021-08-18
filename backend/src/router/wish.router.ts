import express from 'express';
import WishController from '../controller/wish.controller';
import checkNumberInParams from '../middlewares/check-number-params';
import isAuthenticate from '../middlewares/is-authenticate';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.post('/goods/:id', isAuthenticate, checkNumberInParams, wrapAsync(WishController.createWish));
router.delete('/goods/:id', isAuthenticate, checkNumberInParams, wrapAsync(WishController.deleteWish));
export default router;
