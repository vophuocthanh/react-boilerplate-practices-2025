import { AxiosError } from 'axios'

import toastifyCommon from '@/core/lib/toastify-common'

interface ErrorResponse {
  message: string
  statusCode?: number
}

export const handleError = (error: unknown, defaultMessage = 'Something went wrong') => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || error.message || defaultMessage
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
    return {
      message: error.response?.data?.message || error.message || 'Something went wrong',
      statusCode: error.response?.status
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message || 'Something went wrong'
    }
  }

  return {
    message: 'Something went wrong'
  }
}
