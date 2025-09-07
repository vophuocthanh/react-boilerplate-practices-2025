import { type AuthEntity } from '@/features/auth/domain/entities/auth.entity'
import { type LoginResponse } from '@/models/interface/auth.interface'
import { type User } from '@/models/user/interfaces'

export interface AuthState {
  user: LoginResponse['user'] | null
  access_token: string | null
  refresh_token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthStore extends AuthState {
  loginStart: () => void
  loginSuccess: (data: LoginResponse) => void
  loginFailure: (error: string) => void
  logout: () => void
  updateUser: (user: LoginResponse['user']) => void
  setAuthEntity: (authEntity: AuthEntity) => void
  updateUserProfile: (userData: Partial<User>) => void
  clearError: () => void
  hasRole: (role: string) => boolean
  isAdmin: () => boolean
  isEmployee: () => boolean
}
