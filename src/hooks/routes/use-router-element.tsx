import { lazy } from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import LayoutClient from '@/app/layout/layout-client'
import LayoutMain from '@/app/layout/layout-main'
import SuspenseProvider from '@/app/providers/suspense-provider'
import AnimatedLayout from '@/components/animated/animated-layout'
import ProtectedRoute from '@/components/auth/protected-route'
import { ROUTE } from '@/core/constants/path'
import ProfileEdit from '@/pages/profile/ProfileEdit'

// Lazy load components
const HomePage = lazy(() => import('@/pages/home/HomePage'))
const Login = lazy(() => import('@/pages/login/Login'))
const Register = lazy(() => import('@/pages/register/Register'))
const VerifyAcountEmail = lazy(() => import('@/pages/verify-account-email/VerifyAcountEmail'))
const Dashboard = lazy(() => import('@/pages/admin/dashboard'))
const Users = lazy(() => import('@/pages/admin/users'))
const PageNotFound = lazy(() => import('@/pages/404/PageNotFound'))
const Profile = lazy(() => import('@/pages/profile/Profile'))

export default function useRoutesElements() {
  const location = useLocation()
  const isAuthPath = [ROUTE.AUTH.LOGIN, ROUTE.AUTH.REGISTER].includes(location.pathname)
  const isAdminPath = location.pathname.startsWith('/admin')

  const routeElements = (
    <SuspenseProvider>
      <Routes>
        <Route path={ROUTE.HOME} element={<HomePage />} />
        <Route path={ROUTE.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTE.AUTH.REGISTER} element={<Register />} />
        <Route path={ROUTE.AUTH.VERIFY_ACCOUNT_EMAIL} element={<VerifyAcountEmail />} />

        {/* Client protected routes */}
        <Route element={<ProtectedRoute redirectPath={ROUTE.AUTH.LOGIN} />}>
          <Route path={ROUTE.PROFILE.ROOT} element={<LayoutClient />}>
            <Route index element={<Profile />} />
            <Route path='edit' element={<ProfileEdit />} />
          </Route>
        </Route>

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute redirectPath={ROUTE.AUTH.LOGIN} />}>
          <Route path={ROUTE.ADMIN.ROOT} element={<LayoutMain />}>
            <Route path={ROUTE.ADMIN.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTE.ADMIN.USERS} element={<Users />} />
            <Route path={ROUTE.ADMIN.ANALYTICS.ROOT} element={<span>Analytics</span>} />
            <Route path={ROUTE.ADMIN.ANALYTICS.OVERVIEW} element={<span>Analytics Overview</span>} />
            <Route path={ROUTE.ADMIN.ANALYTICS.SALES} element={<span>Analytics Sales</span>} />
            <Route path={ROUTE.ADMIN.ANALYTICS.USERS} element={<span>Analytics Users</span>} />
            <Route path={ROUTE.ADMIN.ANALYTICS.PERFORMANCE} element={<span>Analytics Performance</span>} />
          </Route>
        </Route>

        <Route path={ROUTE.NOT_FOUND} element={<PageNotFound />} />
      </Routes>
    </SuspenseProvider>
  )

  if (isAdminPath) {
    return routeElements
  }

  return <AnimatedLayout isAuthPath={isAuthPath}>{routeElements}</AnimatedLayout>
}
