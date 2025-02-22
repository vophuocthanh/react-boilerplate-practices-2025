import { UserResponseType } from '@/models/interface/user.interface'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getUserFromLocalStorage = (): UserResponseType | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
export const removeAccessTokenFromLS = () => {
  localStorage.removeItem('access_token')
}

export const setUserToLS = (user: { id: string; name: string; email: string; role: string }) => {
  localStorage.setItem('user', JSON.stringify(user))
}
