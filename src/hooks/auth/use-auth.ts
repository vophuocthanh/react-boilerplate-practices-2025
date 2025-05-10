import { useAuthStore } from '@/core/store/features/auth/authStore'

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return { isAuthenticated }
}
