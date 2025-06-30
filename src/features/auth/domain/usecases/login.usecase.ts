import { type Account, type LoginResponse } from '@/models/interface/auth.interface'

import { AuthEntity } from '../entities/auth.entity'
import { type IAuthRepository } from '../repositories/auth.repository'

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: Account): Promise<AuthEntity> {
    // Domain validation
    this.validateCredentials(credentials)

    // Execute business logic through repository
    const loginResponse: LoginResponse = await this.authRepository.login(credentials)

    // Convert to domain entity
    const authEntity = AuthEntity.fromLoginResponse(loginResponse)

    return authEntity
  }

  private validateCredentials(credentials: Account): void {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required')
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Invalid email format')
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
