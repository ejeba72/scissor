"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.homepage = void 0;
function homepage(req, res) { res.render('home'); }
exports.homepage = homepage;
function dashboard(req, res) { res.render('dashboard'); }
exports.dashboard = dashboard;
