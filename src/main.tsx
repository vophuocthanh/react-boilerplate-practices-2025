import { StrictMode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './index.css'
import './locales/i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer className='rounded-lg' transition={Flip} />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
