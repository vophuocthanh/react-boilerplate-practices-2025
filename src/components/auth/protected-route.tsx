import { type ReactNode, useEffect } from 'react'

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { ROUTE } from '@/core/constants/path'
import { getAccessTokenFromLS } from '@/core/shared/storage'
import { useAuth } from '@/hooks/auth/use-auth'

interface ProtectedRouteProps {
  children?: ReactNode
  redirectPath?: string
}

const ProtectedRoute = ({ children, redirectPath = ROUTE.AUTH.LOGIN }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = getAccessTokenFromLS()
    if (!accessToken) {
      navigate(ROUTE.HOME, { replace: true })
    }
  }, [location.pathname, navigate])

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
