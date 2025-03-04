import { z } from 'zod'

export const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

export type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type CompleteToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type ValidateToken = Pick<Auth, 'token'>
export type NewPasswordFormType = Pick<Auth, 'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>

export const ProfileSchema = AuthSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type Profile = z.infer<typeof ProfileSchema>
export type ProfileFormData = Pick<Profile, 'name' | 'email'>

const AuthCurrentSchema = z.object({
    current_password: z.string(),
    password: z.string()
})
export type AuthCurrentUser = z.infer<typeof AuthCurrentSchema>