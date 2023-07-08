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
const console_1 = require("console");
const redirect_route_1 = require("../../../routes/redirect.route");
describe('testing jest itself! ;) ', () => {
    test('to ensure Jest does not play "wayo!"', () => {
        expect(true).toBe(true); // That this test passed, shows that Jest and I are on the same page! :)
    });
});
const req = (0, supertest_1.default)(app_1.default); // httpRequestWithSupertest
app_1.default.use(redirect_route_1.redirectRoute);
describe('testing the homepageRedirect logic', () => {
    test('GET "/"; redirects from "/" to "/scissor/homepage"', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/');
        (0, console_1.log)({ resStatus: res.status, resLocation: res.headers.location, resHeaders: res.headers });
        expect(res.status).toBe(302); // Check that the status code is a redirection
        expect(res.header.location).toBe('/scissor/homepage'); // Check the redirected location
    }));
});
describe('testing the getRedirect logic', () => {
    test('GET "/:id"; redirects from short url to long url', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/node');
        expect(res.status).toBe(302);
        expect(res.header.location).toBe('https://nodejs.org');
    }));
});
