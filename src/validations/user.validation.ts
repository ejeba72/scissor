import { Request } from "express";
import { z } from "zod";

async function signupValidation(data: Request) {
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
        username: z.string({ required_error: 'Username is required' }),
        password: z.string({ required_error: 'Password is required' }),
    })
    const parsedUser = await ZUser.safeParseAsync(data);
    return { parsedUser };
}

// export { signupValidation };