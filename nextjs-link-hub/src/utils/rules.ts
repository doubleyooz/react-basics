import { z } from "zod";

const MIN_TITLE_LENGTH = 5;
const MAX_TITLE_LENGTH = 60;
const MIN_URL_LENGTH = 3;
const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 500;

const email = z.string().email("Please enter a valid email");
const url = z
    .string()
    .url("Please enter a valid URL")
    .min(
        MIN_URL_LENGTH,
        `UrL must be at least ${MIN_URL_LENGTH} characters`
    );
const password = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/);

const confirmPassword = z
    .string()
    .min(8, "Password must be at least 8 characters");



const title = z
    .string()
    .min(
        MIN_TITLE_LENGTH,
        `The title must be at least ${MIN_TITLE_LENGTH} characters long`
    )
    .max(
        MAX_TITLE_LENGTH, `The title must be at most ${MAX_TITLE_LENGTH} characters long`
    );



const description = z
    .string()
    .min(
        MIN_DESCRIPTION_LENGTH,
        `The description must be at least ${MIN_DESCRIPTION_LENGTH} characters long`
    )
    .max(
        MAX_DESCRIPTION_LENGTH,
        `The description must be at most ${MAX_DESCRIPTION_LENGTH} characters long`
    );

export const forgotSchema = z.object({
    email,
});




export const loginSchema = z.object({
    email,
    password,
});

export const addLinkSchema = z.object({
    title,
    description,
});



export const countdown = 360;

export const resetPasswordSchema = z
    .object({
        confirmPassword,
        password,
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });

export const signUpSchema = z.object({
    email,
    password,
});

export type ForgotSchema = z.infer<typeof forgotSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type AddLinkSchema = z.infer<typeof addLinkSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
