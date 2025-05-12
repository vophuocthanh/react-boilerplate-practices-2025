import { type ReactNode } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify'

import ErrorFallback from '@/components/error-fallback/error-fallback'

import QueryProvider from './query-provider'
import { ThemeProvider } from './theme-provider'

interface AppProvidersProps {
  children: ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload()
      }}
    >
      <BrowserRouter>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <QueryProvider>
            <ToastContainer className='rounded-lg' transition={Flip} />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default AppProviders
