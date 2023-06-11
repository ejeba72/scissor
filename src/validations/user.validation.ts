import { Request } from "express";
import { z } from "zod";

async function signupValidation(data: Request) {
    const ZUser = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string({
            required_error: 'email is required'
        }),
        username: z.string({
            required_error: 'Username is required'
        }),
        password: z.string({
            required_error: 'Password is required'
        }),
    })
    const parsedUser = await ZUser.safeParseAsync(data);
    return { parsedUser };
}

export { signupValidation };