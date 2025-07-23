import { lazy } from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import LayoutClient from '@/app/layout/layout-client'
import LayoutMain from '@/app/layout/layout-main'
import SuspenseProvider from '@/app/providers/suspense-provider'
import AnimatedLayout from '@/components/animated/animated-layout'
import ProtectedRoute from '@/components/auth/protected-route'
import { path } from '@/core/constants/path'
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
  const isAuthPath = [path.auth.login, path.auth.register].includes(location.pathname)
  const isAdminPath = location.pathname.startsWith('/admin')

  const routeElements = (
    <SuspenseProvider>
      <Routes>
        <Route path={path.home} element={<HomePage />} />
        <Route path={path.auth.login} element={<Login />} />
        <Route path={path.auth.register} element={<Register />} />
        <Route path={path.auth.verifyAccountEmail} element={<VerifyAcountEmail />} />

        {/* Client protected routes */}
        <Route element={<ProtectedRoute redirectPath={path.auth.login} />}>
          <Route path={path.profile.root} element={<LayoutClient />}>
            <Route index element={<Profile />} />
            <Route path='edit' element={<ProfileEdit />} />
          </Route>
        </Route>

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute redirectPath={path.auth.login} />}>
          <Route path={path.admin.root} element={<LayoutMain />}>
            <Route path={path.admin.dashboard} element={<Dashboard />} />
            <Route path={path.admin.users} element={<Users />} />
          </Route>
        </Route>

        <Route path={path.notFound} element={<PageNotFound />} />
      </Routes>
    </SuspenseProvider>
  )

  if (isAdminPath) {
    return routeElements
  }

  return <AnimatedLayout isAuthPath={isAuthPath}>{routeElements}</AnimatedLayout>
}
