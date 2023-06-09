"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserLogic = exports.logoutLogic = exports.loginLogic = exports.signupLogic = void 0;
function signupLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`signup request`);
        res.json(`this is the signup endpoint`);
    });
}
exports.signupLogic = signupLogic;
function loginLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`login request`);
        res.json(`this is the login endpoint`);
    });
}
exports.loginLogic = loginLogic;
function logoutLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`logout request`);
        res.json(`this is the logout endpoint`);
    });
}
exports.logoutLogic = logoutLogic;
function deleteUserLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`delete user request`);
        res.json(`this is the delete user endpoint`);
    });
}
exports.deleteUserLogic = deleteUserLogic;
