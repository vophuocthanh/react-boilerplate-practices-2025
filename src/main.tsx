import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import AppProviders from './app/providers/app-providers'
import App from './App.tsx'
import '@/styles/global.css'
import './locales/i18n'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)
