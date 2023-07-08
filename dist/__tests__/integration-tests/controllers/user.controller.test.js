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
const req = (0, supertest_1.default)(app_1.default);
describe('POST "/api/vi/user/signup"; signupLogic logic', () => {
    describe('when user provide signup details', () => {
        test('should respond with 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield req.post('/api/vi/user/signup').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@doe.com',
                username: 'JJ',
                password: 'johndoe123',
            });
            expect(res.status).toBe(201);
        }));
    });
});
