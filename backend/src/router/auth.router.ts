import express from 'express';
import { AuthController } from '../controller/auth.controller';
import wrapAsync from '../utils/wrap.async';

const router = express.Router();

router.get('/check', wrapAsync(AuthController.checkLoggedIn));
router.get('/sample', wrapAsync(AuthController.getSampleLogin));
router.post('/logout', wrapAsync(AuthController.logout));
router.get('/github/callback', wrapAsync(AuthController.getOAuthGitHubCb));

export default router;
