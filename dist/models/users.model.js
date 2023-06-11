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
exports.ZUser = exports.UserModel = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
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
    username: zod_1.z
        .string({ required_error: 'Username is required' })
        .trim()
        .toLowerCase(),
    password: zod_1.z.string({ required_error: 'Password is required' }),
});
exports.ZUser = ZUser;
const userSchema = new mongoose_1.Schema({
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    username: 'string',
    password: 'string',
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield (0, bcrypt_1.genSalt)();
        const hashedPassword = yield (0, bcrypt_1.hash)(this.password, salt);
        next();
    });
});
// PREVIOUS FAILED ATTEMPTS
// interface IUser extends Document {
//     firstName: string;
//     lastName: string;
//     email: string;
//     username: string;
//     password: string;
// };
// const userSchema: Schema<IUser> = new Schema<IUser>({
//     firstName: 'string',
//     lastName: 'string',
//     email: 'string',
//     username: 'string',
//     password: 'string',
// });
// const UserModel: Model<IUser> = model<IUser>('User', userSchema);
// export { UserModel };
// import { Schema, model } from 'mongoose';
// import { z } from 'zod';
// const ZUserSchema = z.object({
//     firstName: z.string(),
//     lastName: z.string(),
//     email: z.string(),
//     username: z.string(),
//     password: z.string(),
// });
// const userSchema = new Schema(ZUserSchema.shape);
// const UserModel = model('User', userSchema);
// export { UserModel };
// const userSchema: Schema<z.infer<typeof ZUserSchema>> = new Schema(ZUserSchema.shape,);
// const userSchema = new Schema(ZUserSchema.shape,);
// type UserType = z.infer<typeof ZUserSchema>;
// const userSchema: Schema<UserType> = new Schema<UserType>(ZUserSchema.shape);
// interface IUser {
//     firstName: string;
//     lastName: string;
//     email: string;
//     username: string;
//     password: string;
// }
// const userSchema: <IUser> = new Schema({})
