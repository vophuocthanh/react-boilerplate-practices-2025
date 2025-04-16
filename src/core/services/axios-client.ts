import config from '@/configs'
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  removeAccessTokenFromLS,
  removeRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS
} from '@/core/shared/storage'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig
} from 'axios'
import { isEqual } from 'lodash'

interface TokenResponse {
  access_token: string
  refresh_token: string
}

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

let isRefreshing: boolean = false
type RefreshSubscriber = (token: string) => void
let refreshSubscribers: RefreshSubscriber[] = []

const addSubscriber = (callback: RefreshSubscriber): void => {
  refreshSubscribers.push(callback)
}

const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessTokenFromLS()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response.data
  },
  async (error: AxiosError): Promise<AxiosError> => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig

    if (error.response && isEqual(error.response.status, HttpStatusCode.Unauthorized) && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true
        isRefreshing = true

        try {
          const refreshToken = getRefreshTokenFromLS()

          if (!refreshToken) {
            logout()
            return Promise.reject(error)
          }

          const response = await axios.post<TokenResponse>(`${config.baseUrl}/auth/refresh-token`, {
            refresh_token: refreshToken
          })

          if (isEqual(response.status, HttpStatusCode.Ok)) {
            const { access_token, refresh_token } = response.data

            setAccessTokenToLS(access_token)
            setRefreshTokenToLS(refresh_token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access_token}`
            }

            onRefreshed(access_token)

            isRefreshing = false
            return axiosClient(originalRequest)
          }
        } catch (refreshError) {
          isRefreshing = false

          logout()
          return Promise.reject(refreshError)
        }
      } else {
        return new Promise((resolve) => {
          addSubscriber((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            resolve(axiosClient(originalRequest))
          })
        })
      }
    }

    return Promise.reject(error)
  }
)

const logout = (): void => {
  removeAccessTokenFromLS()
  removeRefreshTokenFromLS()
}

export default axiosClient
