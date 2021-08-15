import express from 'express';
import { UserController } from '../controller/user.controller';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/address', wrapAsync(UserController.getAddresses));
router.post('/address', wrapAsync(UserController.createAddress));
router.delete('/address/:id', wrapAsync(UserController.deleteAddress));
router.put('/address/:id', wrapAsync(UserController.updateAddress));

export default router;
