import { create } from 'zustand'

import { getPersistedAuth } from '@/core/shared/auth'
import { clearLS } from '@/core/shared/storage'
import { type AuthEntity } from '@/features/auth/domain/entities/auth.entity'
import { type LoginResponse } from '@/models/interface/auth.interface'
import { type User } from '@/models/user/interfaces'

import { type AuthState, type AuthStore } from './types'

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,
  ...getPersistedAuth(),

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
      user: data?.user,
      access_token: data?.access_token,
      refresh_token: data?.refresh_token,
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
    clearLS()
    set({
      ...initialState
    })
  },

  updateUser: (user: LoginResponse['user']) => {
    set({
      user
    })
  },

  // Clean Architecture methods
  setAuthEntity: (authEntity: AuthEntity) => {
    // Map User interface to LoginResponse user format
    const userForStore = {
      id: authEntity.user.id,
      name: authEntity.user.full_name,
      email: authEntity.user.email,
      role: authEntity.user.role
    }

    set({
      isLoading: false,
      isAuthenticated: true,
      user: userForStore,
      access_token: authEntity.accessToken,
      refresh_token: authEntity.refreshToken,
      error: null
    })
  },

  updateUserProfile: (userData: Partial<User>) => {
    const currentUser = get().user
    if (currentUser) {
      // Map back to store format
      const updatedUser = {
        ...currentUser,
        name: userData.full_name || currentUser.name,
        email: userData.email || currentUser.email,
        role: userData.role || currentUser.role
      }
      set({
        user: updatedUser
      })
    }
  },

  clearError: () => {
    set({ error: null })
  },

  // Helper methods
  hasRole: (role: string): boolean => {
    const { user } = get()
    return user?.role === role
  },

  isAdmin: (): boolean => {
    const { user } = get()
    return user?.role === 'ADMIN'
  },

  isEmployee: (): boolean => {
    const { user } = get()
    return user?.role === 'USER' || user?.role === 'MODERATOR'
  }
}))

// Selector hooks for better performance
export const useAuthUser = () => useAuthStore((state) => state.user)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
