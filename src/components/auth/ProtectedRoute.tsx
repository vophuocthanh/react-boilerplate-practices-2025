import { type ReactNode } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '@/hooks/auth/use-auth'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
