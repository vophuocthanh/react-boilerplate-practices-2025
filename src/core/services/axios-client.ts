import axios, { HttpStatusCode } from 'axios'

import { AUTH_ENDPOINTS } from '@/core/configs/consts'
import config from '@/core/configs/env'
import isEqual from '@/core/configs/is-equal'
import { authApi } from '@/core/services/auth.service'
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  removeAccessTokenFromLS,
  removeRefreshTokenFromLS,
  setAccessTokenToLS
} from '@/core/shared/storage'

const controllers = new Map<string, AbortController>()
let isRefreshing = false
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    if (config.url) {
      const prevController = controllers.get(config.url)
      if (prevController) {
        prevController.abort()
      }
    }

    const controller = new AbortController()
    config.signal = controller.signal

    if (config.url) {
      controllers.set(config.url, controller)
    }

    const token = getAccessTokenFromLS()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    if (response.config.url) {
      controllers.delete(response.config.url)
    }
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    // Check if the request is an auth request (login, register...)
    const isAuthRequest = AUTH_ENDPOINTS.some(
      (endpoint) => originalRequest.url && originalRequest.url.includes(endpoint)
    )

    // Only refresh token if it's not an auth request
    if (
      error.response &&
      isEqual(error.response.status, HttpStatusCode.Unauthorized) &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axiosClient(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refresh_token = getRefreshTokenFromLS()
        if (!refresh_token) {
          removeAccessTokenFromLS()
          removeRefreshTokenFromLS()
          processQueue(new Error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại'), null)
          return Promise.reject(error)
        }

        const { access_token } = await authApi.refreshToken(refresh_token)
        setAccessTokenToLS(access_token)
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        processQueue(null, access_token)
        return axiosClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        removeAccessTokenFromLS()
        removeRefreshTokenFromLS()
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    if (originalRequest?.url) {
      controllers.delete(originalRequest.url)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
