// NOTE: Both the redirect endpoint and views endpoints share this route.
import { Router } from 'express';
import { getRedirect, } from '../controllers/redirect.controller';
import { homepage } from '../controllers/scissor.controller';

const router = Router();
router.get('/:code', getRedirect);
router.get('/', homepage); // Scissor's homepage

export { router as redirectRoute };