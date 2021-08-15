import express from 'express';
import { UserController } from '../controller/user.controller';
import checkNumberInParams from '../middlewares/check-number-params';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/address', wrapAsync(UserController.getAddresses));
router.post('/address', wrapAsync(UserController.createAddress));
router.delete('/address/:id', checkNumberInParams, wrapAsync(UserController.deleteAddress));
router.put('/address/:id', checkNumberInParams, wrapAsync(UserController.updateAddress));

export default router;
