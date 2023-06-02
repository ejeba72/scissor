"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRoute = void 0;
const express_1 = require("express");
const url_controller_1 = require("../controllers/url.controller");
const router = (0, express_1.Router)();
exports.urlRoute = router;
router.post('/', url_controller_1.postNewShortUrl);
