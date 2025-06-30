import { authApi } from '@/core/services/auth.service'
import {
  type LoginResponse,
  type Account,
  type RegisterReponse,
  type VerifyEmailReq
} from '@/models/interface/auth.interface'

export interface IAuthDataSource {
  login(credentials: Account): Promise<LoginResponse>
  register(data: RegisterReponse): Promise<{ message: string }>
  refreshToken(refreshToken: string): Promise<LoginResponse>
  verifyEmail(data: VerifyEmailReq): Promise<{ message: string }>
  resendVerificationCode(email: string): Promise<{ message: string }>
  logout(refreshToken: string): Promise<void>
}

export class AuthDataSourceImpl implements IAuthDataSource {
  async login(credentials: Account): Promise<LoginResponse> {
    return await authApi.login(credentials)
  }

  async register(data: RegisterReponse): Promise<{ message: string }> {
    await authApi.register(data)
    return { message: 'Registration successful' }
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return await authApi.refreshToken(refreshToken)
  }

  async verifyEmail(data: VerifyEmailReq): Promise<{ message: string }> {
    await authApi.verifyEmail(data)
    return { message: 'Email verified successfully' }
  }

  async resendVerificationCode(email: string): Promise<{ message: string }> {
    await authApi.resendVerificationCode(email)
    return { message: 'Verification code sent' }
  }

  async logout(refreshToken: string): Promise<void> {
    await authApi.logout(refreshToken)
  }
}
