import { type ReactNode, useEffect } from 'react'

import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { path } from '@/core/constants/path'
import { getAccessTokenFromLS } from '@/core/shared/storage'
import { useAuth } from '@/hooks/auth/use-auth'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = getAccessTokenFromLS()
    if (!accessToken) {
      navigate(path.home, { replace: true })
    }
  }, [location.pathname, navigate])

  if (!isAuthenticated) {
    return <Navigate to={path.home} state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
