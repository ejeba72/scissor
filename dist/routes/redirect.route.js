"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectRoute = void 0;
const express_1 = require("express");
const redirect_controller_1 = require("../controllers/redirect.controller");
const router = (0, express_1.Router)();
exports.redirectRoute = router;
router.get('/:code', redirect_controller_1.getRedirect);
