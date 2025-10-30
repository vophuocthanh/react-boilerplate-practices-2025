import { type AxiosInstance } from 'axios'

import axiosClient from '@/core/services/axios-client'
import {
  type VerifyEmailReq,
  type Account,
  type LoginResponse,
  type LoginApiResponse,
  type RegisterReponse,
  type VerifyEmailRes
} from '@/models/interface/auth.interface'

const API_LOGIN_URL = '/auth/login'
const API_REGISTER_URL = '/auth/register'
const API_REFRESH_TOKEN_URL = '/auth/refresh-token'
const API_VERIFY_EMAIL_URL = '/auth/verify-email'
const API_RESEND_CODE_URL = '/auth/resend-verification-email'
const API_LOGOUT_URL = '/auth/logout'

export type AuthApi = {
  login: (params: Account) => Promise<LoginApiResponse>
  register: (params: Account) => Promise<RegisterReponse>
  refreshToken: (refreshToken: string) => Promise<LoginResponse>
  verifyEmail: (params: VerifyEmailReq) => Promise<VerifyEmailRes>
  resendVerificationCode: (email: string) => Promise<{ message: string }>
  logout: (refresh_token: string) => Promise<void>
}

export const createAuthApi = (client: AxiosInstance): AuthApi => ({
  login(params) {
    return client.post(API_LOGIN_URL, params)
  },
  register(params) {
    return client.post(API_REGISTER_URL, params)
  },
  refreshToken(refreshToken) {
    return client.post(API_REFRESH_TOKEN_URL, { refresh_token: refreshToken })
  },
  verifyEmail(params) {
    return client.post(API_VERIFY_EMAIL_URL, params)
  },
  resendVerificationCode(email) {
    return client.post(API_RESEND_CODE_URL, { email })
  },
  logout(refresh_token) {
    return client.post(API_LOGOUT_URL, { refresh_token })
  }
})

export const authApi: AuthApi = createAuthApi(axiosClient)
