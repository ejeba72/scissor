import { Document, Model, Schema, model } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
};

const userSchema: Schema<IUser> = new Schema<IUser>({
    firstName: 'string',
    lastName: 'string',
    email: {
        type: 'string',
        // unique: [ true, 'Email unavailable. Try another email'],
        unique: true,
    },
    username: 'string',
    password: 'string',
});

const UserModel: Model<IUser> = model<IUser>('User', userSchema);

export { UserModel };




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