import { useLocation, useRoutes } from 'react-router-dom'
import { ReactNode } from 'react'
import LayoutMain from '@/app/layout/LayoutMain'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import Dashboard from '@/pages/dashboard/Dashboard'
import PageNotFound from '@/pages/404/PageNotFound'
import { path } from '@/core/constants/path'
import { AnimatePresence, motion } from 'framer-motion'

interface RouteConfig {
  path: string
  element: ReactNode
}

export default function useRoutesElements() {
  const location = useLocation()

  const routes: RouteConfig[] = [
    { path: path.home, element: <HomePage /> },
    { path: path.login, element: <Login /> },
    { path: path.register, element: <Register /> },
    {
      path: path.admin.dashboard,
      element: (
        <LayoutMain>
          <Dashboard />
        </LayoutMain>
      )
    },
    { path: '*', element: <PageNotFound /> }
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
