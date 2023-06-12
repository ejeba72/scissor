import { compare, genSalt, hash } from "bcrypt";
import { Document, Model, Schema, model } from "mongoose";
import { z } from "zod";

const ZUser = z.object({
    firstName: z
        .string({ required_error: 'First name is required' })
        .max(50, 'First name must be 50 characters or less')
        .trim(),
    lastName: z
        .string({ required_error: 'Last name is required' })
        . max(50, 'Last name must be 50 characters or less')
        .trim(),
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .toLowerCase()
        .email({ message: 'Email address is invalid' }),
    username: z
        .string({ required_error: 'Username is required' })
        .trim()
        .toLowerCase(),
    password: z.string({ required_error: 'Password is required' }),
});

type UserType = z.infer<typeof ZUser>;

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
    email: 'string',
    username: 'string',
    password: 'string',
});

userSchema.pre('save', async function (next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

userSchema.methods.authenticateUser = async function(password: string) {
    // Compare password received from client with password stored in DB.
    const comparePasswords = await compare(password, this.password);
    if (comparePasswords) return true;
    return false;
};

// userSchema.statics.login = async function (email: string, username: string, password: string): Promise<IUser> {
//     // 1. Find out if user exist in database.
//     // 2. If so, compare password received from client with password stored in DB.
//     const findWithEmail = (await this.find({ email }))[0];  // i.e. await this.findOne({ email })
//     const findWithUsername = (await this.find({ username }))[0];
//     const existingUser = findWithEmail || findWithUsername;
//     if (!existingUser) throw Error('Invalid email (or username) and password');
//     const comparePasswords = await compare(password, existingUser.password);
//     if (!comparePasswords) throw Error('Invalid email (or username) and password');
//     return existingUser;
// };

const UserModel: Model<IUser> = model<IUser>('User', userSchema);

export { UserModel, ZUser };











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