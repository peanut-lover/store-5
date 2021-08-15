import express from 'express';
import { UserController } from '../controller/user.controller';
import checkNumberInParams from '../middlewares/check-number-params';
import isAuthenticate from '../middlewares/is-authenticate';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/address', isAuthenticate, wrapAsync(UserController.getAddresses));
router.post('/address', isAuthenticate, wrapAsync(UserController.createAddress));
router.delete('/address/:id', isAuthenticate, checkNumberInParams, wrapAsync(UserController.deleteAddress));
router.put('/address/:id', isAuthenticate, checkNumberInParams, wrapAsync(UserController.updateAddress));

export default router;
