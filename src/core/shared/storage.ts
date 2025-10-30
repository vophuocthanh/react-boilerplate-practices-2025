import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY
} from '@/core/helpers/common'
import { type UserResponseType } from '@/models/interface/user.interface'

export const LocalStorageEventTarget = new EventTarget()
export const setAccessTokenToLS = (access_token: string) =>
  localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, access_token)

export const setRefreshTokenToLS = (refresh_token: string) =>
  localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, refresh_token)

export const setToken = (access_token: string, refresh_token: string) => {
  localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, access_token)
  localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
  localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) || ''

export const getRefreshTokenFromLS = () => localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY) || ''

export const getUserFromLocalStorage = (): UserResponseType | null => {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  if (!user || user === 'undefined' || user === 'null') {
    return null
  }
  try {
    return JSON.parse(user)
  } catch (error) {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
    return null
  }
}

export const removeAccessTokenFromLS = () => localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)

export const setUserToLS = (user: { id: string; name: string; email: string; role: string }) =>
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user))

export const removeRefreshTokenFromLS = () => localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
