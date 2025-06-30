import {
  type LoginResponse,
  type Account,
  type RegisterReponse,
  type VerifyEmailReq
} from '@/models/interface/auth.interface'

import { type IAuthRepository } from '../../domain/repositories/auth.repository'

// Data source interface
interface IAuthDataSource {
  login(credentials: Account): Promise<LoginResponse>
  register(data: RegisterReponse): Promise<{ message: string }>
  refreshToken(refreshToken: string): Promise<LoginResponse>
  verifyEmail(data: VerifyEmailReq): Promise<{ message: string }>
  resendVerificationCode(email: string): Promise<{ message: string }>
  logout(refreshToken: string): Promise<void>
}

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly authDataSource: IAuthDataSource) {}

  async login(credentials: Account): Promise<LoginResponse> {
    return await this.authDataSource.login(credentials)
  }

  async register(data: RegisterReponse): Promise<{ message: string }> {
    return await this.authDataSource.register(data)
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return await this.authDataSource.refreshToken(refreshToken)
  }

  async verifyEmail(data: VerifyEmailReq): Promise<{ message: string }> {
    return await this.authDataSource.verifyEmail(data)
  }

  async resendVerificationCode(email: string): Promise<{ message: string }> {
    return await this.authDataSource.resendVerificationCode(email)
  }

  async logout(refreshToken: string): Promise<void> {
    await this.authDataSource.logout(refreshToken)
  }
}
