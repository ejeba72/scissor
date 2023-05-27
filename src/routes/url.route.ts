import { Router } from "express";
import { createShortUrl } from "../controllers/url.controller";


const router = Router();

router.post('/', createShortUrl);

export { router as urlRoute };