import LayoutMain from '@/app/layout/LayoutMain'
import { path } from '@/core/constants/path'
import PageNotFound from '@/pages/404/PageNotFound'
import Dashboard from '@/pages/dashboard/Dashboard'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import { useLocation, useRoutes } from 'react-router-dom'

export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.home, element: <HomePage /> },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      { path: path.admin.dashboard, element: <LayoutMain children={<Dashboard />} /> },
      { path: '*', element: <PageNotFound /> }
    ],
    location
  )

  return <div className='w-full'>{routeElements}</div>
}
