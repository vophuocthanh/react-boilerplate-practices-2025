import { type LoginResponse } from '@/models/interface/auth.interface'

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
}
