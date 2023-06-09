"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
;
const userSchema = new mongoose_1.Schema({
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    userName: 'string',
    password: 'string',
});
const UserModel = (0, mongoose_1.model)('Url', userSchema);
exports.UserModel = UserModel;
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
