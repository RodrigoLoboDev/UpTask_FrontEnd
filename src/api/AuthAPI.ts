import api from "@/lib/axios";
import { AuthCurrentUser, CheckPasswordForm, CompleteToken, ForgotPasswordForm, NewPasswordFormType, Profile, ProfileFormData, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, ValidateToken } from "@/types/AuthType";
import { isAxiosError } from "axios";


export async function createAccount(formData : UserRegistrationForm) {   
    try {
        const url = '/auth/create-account'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token : CompleteToken) {   
    try {
        const url = '/auth/confirm-account'
        const { data } = await api.post<string>(url, token)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestNewCode(formData : RequestConfirmationCodeForm) {   
    try {
        const url = '/auth/request-new-code'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData : UserLoginForm) {   
    try {
        const url = '/auth/login'
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_JWT', data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPasswordReset(formData : ForgotPasswordForm) {   
    try {
        const url = '/auth/request-password-reset'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData : ValidateToken) {   
    try {
        const url = '/auth/validate-token-password-reset'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePassword({formData, token} : {formData : NewPasswordFormType, token: string}) {   
    try {
        const url = `/auth/reset-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {   
    try {
        const url = '/auth/user'
        const { data } = await api<Profile>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Profile

export async function updateProfile(formData : ProfileFormData) {   
    try {
        const url = '/auth/profile'
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateCurrentUserPassword(formData : AuthCurrentUser) {   
    try {
        const url = '/auth/profile/update-password'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData : CheckPasswordForm) {   
    try {
        const url = '/auth/check-password'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}