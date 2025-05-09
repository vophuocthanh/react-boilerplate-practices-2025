import axiosClient from '@/core/services/axios-client'
import {
  type VerifyEmailReq,
  type Account,
  type LoginResponse,
  type RegisterReponse,
  type VerifyEmailRes
} from '@/models/interface/auth.interface'

const API_LOGIN_URL = '/auth/login'
const API_REGISTER_URL = '/auth/register'
const API_REFRESH_TOKEN_URL = '/auth/refresh-token'
const API_VERIFY_EMAIL_URL = '/auth/verify-email'
const API_RESEND_CODE_URL = '/auth/resend-verification-email'
const API_LOGOUT_URL = '/auth/logout'
export const authApi = {
  login(params: Account): Promise<LoginResponse> {
    return axiosClient.post(API_LOGIN_URL, params)
  },
  register(params: Account): Promise<RegisterReponse> {
    return axiosClient.post(API_REGISTER_URL, params)
  },
  refreshToken(refreshToken: string): Promise<LoginResponse> {
    return axiosClient.post(API_REFRESH_TOKEN_URL, { refresh_token: refreshToken })
  },
  verifyEmail(params: VerifyEmailReq): Promise<VerifyEmailRes> {
    return axiosClient.post(API_VERIFY_EMAIL_URL, params)
  },

  resendVerificationCode(email: string): Promise<{ message: string }> {
    return axiosClient.post(API_RESEND_CODE_URL, { email })
  },

  logout(refresh_token: string): Promise<void> {
    return axiosClient.post(API_LOGOUT_URL, { refresh_token })
  }
}
