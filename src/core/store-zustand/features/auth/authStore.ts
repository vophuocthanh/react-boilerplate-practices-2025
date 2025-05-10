import { create } from 'zustand'

import { type LoginResponse } from '@/models/interface/auth.interface'

import { type AuthState, type AuthStore } from './types'

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  loginStart: () => {
    set({
      isLoading: true,
      error: null
    })
  },

  loginSuccess: (data: LoginResponse) => {
    set({
      isLoading: false,
      isAuthenticated: true,
      user: data.user,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      error: null
    })
  },

  loginFailure: (error: string) => {
    set({
      isLoading: false,
      error
    })
  },

  logout: () => {
    set({
      ...initialState
    })
  },

  updateUser: (user: LoginResponse['user']) => {
    set({
      user
    })
  }
}))
