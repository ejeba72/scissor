import { Router } from 'express';
import { getRedirect } from '../controllers/redirect.controller';
import { dashboard, homepage } from '../controllers/view.controller';

const router = Router();

router.get('/', homepage);
router.get('/dashboard', dashboard)
router.get('/:code', getRedirect);

export { router as redirectRoute };