import { AxiosError } from 'axios'

import { AUTH_ENDPOINTS, AUTH_ERROR_MESSAGES } from '@/core/configs/consts'
import toastifyCommon from '@/core/lib/toastify-common'

interface ErrorResponse {
  message: string
  statusCode?: number
}

export const handleError = (error: unknown, defaultMessage = 'Something went wrong') => {
  if (error instanceof Error) {
    const errorMessage = error.message
    if (AUTH_ERROR_MESSAGES.some((msg) => errorMessage.includes(msg))) {
      const friendlyMessage = 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại'
      toastifyCommon.error(friendlyMessage)
      return friendlyMessage
    }
  }

  if (error instanceof AxiosError) {
    const errorData = error.response?.data?.message
    const requestUrl = error.config?.url || ''

    const isAuthRequest = AUTH_ENDPOINTS.some((endpoint) => requestUrl.includes(endpoint))

    if (errorData && typeof errorData === 'object') {
      const messages = Object.values(errorData).join(', ')
      toastifyCommon.error(messages)
      return messages
    }

    const errorMessage = errorData || error.message || defaultMessage

    if (error.response?.status === 401 && !isAuthRequest) {
      if (!errorData) {
        const friendlyMessage = 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại'
        toastifyCommon.error(friendlyMessage)
        return friendlyMessage
      }
    }

    toastifyCommon.error(errorMessage)
    return errorMessage
  }

  if (error instanceof Error) {
    toastifyCommon.error(error.message || defaultMessage)
    return error.message || defaultMessage
  }

  toastifyCommon.error(defaultMessage)
  return defaultMessage
}

export const handleApiError = (error: unknown): ErrorResponse => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data?.message
    const requestUrl = error.config?.url || ''

    const isAuthRequest = AUTH_ENDPOINTS.some((endpoint) => requestUrl.includes(endpoint))
    if (errorData && typeof errorData === 'object') {
      const messages = Object.values(errorData).join(', ')
      return {
        message: messages,
        statusCode: error.response?.status
      }
    }

    if (error.response?.status === 401 && !errorData && !isAuthRequest) {
      return {
        message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại',
        statusCode: 401
      }
    }

    return {
      message: errorData || error.message || 'Something went wrong',
      statusCode: error.response?.status
    }
  }

  if (error instanceof Error) {
    if (AUTH_ERROR_MESSAGES.some((msg) => error.message.includes(msg))) {
      return {
        message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại'
      }
    }

    return {
      message: error.message || 'Something went wrong'
    }
  }

  return {
    message: 'Something went wrong'
  }
}
