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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const url_route_1 = require("../../../routes/url.route");
const console_1 = require("console");
const req = (0, supertest_1.default)(app_1.default);
const apiV1 = '/api/v1';
app_1.default.use(`${apiV1}`, url_route_1.urlRoute);
describe('deleteQrcodeImg logic', () => {
    test('status code response for unauthenticated request', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.delete('/api/v1/deleteQrcodeImg');
        (0, console_1.log)({ resHeader: res.header, resHeaders: res.headers, resRedirect: res.redirect, resRedirects: res.redirects, resBody: res.body, resInfo: res.info, resUnauthorized: res.unauthorized, resStatusType: res.statusType, resType: res.type, resStatus: res.status, resServerError: res.serverError, resText: res.text });
        expect(res.statusCode).toBe(302);
        expect(res.redirect).toBe(true);
        expect(res.header.location).toBe('/scissor/login');
    }));
    test('status code response for authenticated request', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.delete('/api/v1/deleteQrcodeImg');
        // req.saveCookies; req.attachCookies;
        expect(res.statusCode).toBe(204);
        expect(res.redirect).toBe(false);
        expect(res.header.location).toBeFalsy();
    }));
});
