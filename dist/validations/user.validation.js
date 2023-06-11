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
            firstName: zod_1.z
                .string({ required_error: 'First name is required' })
                .max(50, 'First name must be 50 characters or less')
                .trim(),
            lastName: zod_1.z
                .string({ required_error: 'Last name is required' })
                .max(50, 'Last name must be 50 characters or less')
                .trim(),
            email: zod_1.z
                .string({ required_error: 'Email is required' })
                .trim()
                .toLowerCase()
                .email({ message: 'Email address is invalid' }),
            username: zod_1.z.string({ required_error: 'Username is required' }),
            password: zod_1.z.string({ required_error: 'Password is required' }),
        });
        const parsedUser = yield ZUser.safeParseAsync(data);
        return { parsedUser };
    });
}
exports.signupValidation = signupValidation;
