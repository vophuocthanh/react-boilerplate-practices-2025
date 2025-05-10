import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { path } from '@/core/constants/path'
import { useAuth } from '@/hooks/auth/use-auth'

export const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(path.home)
    }
  }, [isAuthenticated, navigate])
}
