import express from 'express';
import { AuthController } from '../controller/auth.controller';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/check', AuthController.checkLoggedIn);
router.get('/github/callback', wrapAsync(AuthController.getOAuthGitHubCb));
export default router;
