import { useLocation, useRoutes } from 'react-router-dom'
import { ReactNode } from 'react'
import LayoutMain from '@/app/layout/LayoutMain'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import Dashboard from '@/pages/dashboard/Dashboard'
import PageNotFound from '@/pages/404/PageNotFound'
import { path } from '@/core/constants/path'
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

  return <div className='w-full'>{routeElements}</div>
}
