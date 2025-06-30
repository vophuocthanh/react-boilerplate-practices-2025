import { type RegisterReponse } from '@/models/interface/auth.interface'

import { type IAuthRepository } from '../repositories/auth.repository'

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: RegisterReponse): Promise<{ message: string }> {
    // Domain validation
    this.validateRegisterData(data)

    // Execute business logic
    const result = await this.authRepository.register(data)
    return result
  }

  private validateRegisterData(data: RegisterReponse): void {
    if (!data.email || !data.password || !data.name) {
      throw new Error('Email, password, and name are required')
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error('Invalid email format')
    }

    if (data.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (data.name.length < 2) {
      throw new Error('Name must be at least 2 characters')
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
