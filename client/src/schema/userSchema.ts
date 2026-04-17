import { z } from "zod";


export const userSignUpSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full Name is required")
        .min(4, "Full Name must be at least 4 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    mobileNumber: z
        .string()
        .min(1, "Mobile number is required")
        .min(10, "Mobile number must be at least 10 digits")
        .regex(/^\d+$/, "Mobile number must contain only digits"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export type SignupInput = z.infer<typeof userSignUpSchema>;


export const userSignInSchema = z.object({
    email: z.string().min(1, "Email Required").email("Invalid Email Address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
})

export type LoginInput = z.infer<typeof userSignInSchema>;