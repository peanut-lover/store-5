import express from 'express';
import CartController from '../controller/cart.controller';
import wrapAsync from '../utils/wrap-async';
import isAuthenticate from '../middlewares/is-authenticate';
import checkNumberInParams from '../middlewares/check-number-params';

const router = express.Router();

router.get('/', isAuthenticate, wrapAsync(CartController.getAllCart));
router.post('/', isAuthenticate, wrapAsync(CartController.createCart));
router.patch('/:id', isAuthenticate, checkNumberInParams, wrapAsync(CartController.updateCart));
router.delete('/', isAuthenticate, wrapAsync(CartController.deleteCarts));

export default router;
