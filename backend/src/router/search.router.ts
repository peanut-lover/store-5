import express from 'express';
import { SearchController } from '../controller/search.controller';
import wrapAsync from '../utils/wrap-async';

const router = express.Router();

router.get('/', wrapAsync(SearchController.getAutoSearchList));

export default router;
