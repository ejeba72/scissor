// NOTE: Both the redirect endpoint and views endpoints share this route.
import { Router } from 'express';
import { getRedirect, } from '../controllers/redirect.controller';

const router = Router();
router.get('/:code', getRedirect);

export { router as redirectRoute };