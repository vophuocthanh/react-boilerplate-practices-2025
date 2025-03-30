import { toast, ToastOptions } from 'react-toastify'

interface CustomToastOptions extends ToastOptions {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  autoClose?: number | false
  hideProgressBar?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
  theme?: 'light' | 'dark' | 'colored'
}

const defaultOptions: CustomToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored'
}

const ToastifyCommon = {
  success: (message: string, options: CustomToastOptions = {}) => {
    toast.success(message, {
      ...defaultOptions,
      ...options
    })
  },

  error: (message: string, options: CustomToastOptions = {}) => {
    toast.error(message, {
      ...defaultOptions,
      ...options
    })
  },

  warning: (message: string, options: CustomToastOptions = {}) => {
    toast.warn(message, {
      ...defaultOptions,
      ...options
    })
  },

  info: (message: string, options: CustomToastOptions = {}) => {
    toast.info(message, {
      ...defaultOptions,
      ...options
    })
  },

  basic: (message: string, options: CustomToastOptions = {}) => {
    toast(message, {
      ...defaultOptions,
      ...options
    })
  },

  clear: (): void => {
    toast.dismiss()
  },

  custom: (message: string, customOptions: CustomToastOptions = {}) => {
    toast(message, {
      ...defaultOptions,
      ...customOptions
    })
  }
}

export default ToastifyCommon
