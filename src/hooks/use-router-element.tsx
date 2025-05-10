import { Suspense, lazy, type ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'

import LayoutMain from '@/app/layout/layout-main'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { path } from '@/core/constants/path'

// Lazy load components
const HomePage = lazy(() => import('@/pages/home/HomePage'))
const Login = lazy(() => import('@/pages/login/Login'))
const Register = lazy(() => import('@/pages/register/Register'))
const VerifyAcountEmail = lazy(() => import('@/pages/verify-account-email/VerifyAcountEmail'))
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const PageNotFound = lazy(() => import('@/pages/404/PageNotFound'))

interface RouteConfig {
  path: string
  element: ReactNode
}

export default function useRoutesElements() {
  const location = useLocation()

  const routes: RouteConfig[] = [
    {
      path: path.home,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <HomePage />
        </Suspense>
      )
    },
    {
      path: path.login,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      )
    },
    {
      path: path.register,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Register />
        </Suspense>
      )
    },
    {
      path: path.verifyAccountEmail,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <VerifyAcountEmail />
        </Suspense>
      )
    },
    {
      path: path.admin.dashboard,
      element: (
        <LayoutMain>
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        </LayoutMain>
      )
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <PageNotFound />
        </Suspense>
      )
    }
  ]

  const routeElements = useRoutes(routes, location)
  const isAuthPath = [path.login, path.register].includes(location.pathname)

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.key}
        initial={{ opacity: 0, x: isAuthPath ? 20 : 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isAuthPath ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: isAuthPath ? 'absolute' : 'relative', width: '100%' }}
      >
        {routeElements}
      </motion.div>
    </AnimatePresence>
  )
}
