import { type LoginResponse, type Account, type RegisterReponse, type VerifyEmailReq } from './auth.interface'

// Repository interface for clean architecture
export interface IAuthRepository {
  login(credentials: Account): Promise<LoginResponse>
  register(data: RegisterReponse): Promise<{ message: string }>
  refreshToken(refreshToken: string): Promise<LoginResponse>
  verifyEmail(data: VerifyEmailReq): Promise<{ message: string }>
  resendVerificationCode(email: string): Promise<{ message: string }>
  logout(refreshToken: string): Promise<void>
}
