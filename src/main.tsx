import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@/app/providers/theme-provider.tsx'

import 'react-toastify/dist/ReactToastify.css'

import QueryProvider from './app/providers/query-provider.tsx'
import App from './App.tsx'

import './index.css'
import './locales/i18n'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <QueryProvider>
          <ToastContainer className='rounded-lg' transition={Flip} />
          <App />
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
