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
exports.signupValidation = void 0;
const zod_1 = require("zod");
function signupValidation(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const ZUser = zod_1.z.object({
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string(),
            email: zod_1.z.string({
                required_error: 'email is required'
            }),
            username: zod_1.z.string({
                required_error: 'Username is required'
            }),
            password: zod_1.z.string({
                required_error: 'Password is required'
            }),
        });
        const parsedUser = yield ZUser.safeParseAsync(data);
        return { parsedUser };
    });
}
exports.signupValidation = signupValidation;
