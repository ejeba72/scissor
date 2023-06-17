// NOTE: Both the redirect endpoint and views endpoints share this route.
import { Router } from 'express';
import { dashboard, getRedirect, homepage } from '../controllers/general.controller';

const router = Router();
router.get('/', homepage);
router.get('/dashboard', dashboard);
router.get('/:code', getRedirect);

export { router as generalRoute };