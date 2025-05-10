import { getAccessTokenFromLS, getUserFromLocalStorage } from '@/core/shared/storage'
import { type AuthState } from '@/core/store/features/auth/types'

export const getPersistedAuth = (): Partial<AuthState> => {
  const access_token = getAccessTokenFromLS()
  const user = getUserFromLocalStorage()
  if (access_token) {
    return {
      access_token,
      user,
      isAuthenticated: true
    }
  }
  return {}
}

export const isAuthenticated = (): boolean => {
  return !!getPersistedAuth().access_token
}

export const getCurrentUser = () => {
  return getPersistedAuth().user
}
