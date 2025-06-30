import { type LoginResponse } from '@/models/interface/auth.interface'
import { type User } from '@/models/user/interfaces'

export class AuthEntity {
  constructor(
    public readonly user: User,
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly isAuthenticated: boolean = true
  ) {}

  static fromLoginResponse(response: LoginResponse): AuthEntity {
    // Map the response user to our User interface
    const user: User = {
      id: response.user.id,
      email: response.user.email,
      full_name: response.user.name,
      role: response.user.role as any, // Will need to map this properly
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return new AuthEntity(user, response.access_token, response.refresh_token)
  }

  isAdmin(): boolean {
    return this.user.role === 'ADMIN'
  }

  isUser(): boolean {
    return this.user.role === 'USER'
  }

  isModerator(): boolean {
    return this.user.role === 'MODERATOR'
  }

  hasRole(role: string): boolean {
    return this.user.role === role
  }

  isActive(): boolean {
    return this.isAuthenticated && !!this.user.id
  }

  getDisplayName(): string {
    return this.user.full_name || this.user.email
  }

  getTokens() {
    return {
      access_token: this.accessToken,
      refresh_token: this.refreshToken
    }
  }
}
