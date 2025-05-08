import { type User } from '@/models/user/interfaces'

export interface TokenResponse {
  access_token: string
  refresh_token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirm_password: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}
