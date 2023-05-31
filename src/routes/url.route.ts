import { Router } from "express";
import { postNewShortUrl } from "../controllers/url.controller";


const router = Router();

router.post('/', postNewShortUrl);

export { router as urlRoute };