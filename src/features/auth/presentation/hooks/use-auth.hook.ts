import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { path } from '@/core/constants/path'
import { authContainer } from '@/core/di/auth.container'
import { handleError } from '@/core/helpers/error-handler'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import toastifyCommon from '@/core/lib/toastify-common'
import { setToken, setUserToLS } from '@/core/shared/storage'
import { useAuthStore } from '@/core/store/features/auth/authStore'
import { type Account, type RegisterReponse } from '@/models/interface/auth.interface'

export const useLoginAuth = () => {
  const navigate = useNavigate()
  const store = useAuthStore()

  return useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: async (credentials: Account) => {
      return await authContainer.loginUseCase.execute(credentials)
    },
    onSuccess: (authEntity) => {
      // Update store using clean architecture method
      store.setAuthEntity(authEntity)

      // Update localStorage
      const tokens = authEntity.getTokens()
      setToken(tokens.access_token, tokens.refresh_token)

      // Map user for localStorage (expects LoginResponse user format)
      const userForStorage = {
        id: authEntity.user.id,
        name: authEntity.user.full_name,
        email: authEntity.user.email,
        role: authEntity.user.role
      }
      setUserToLS(userForStorage)

      // Navigate based on role using domain logic
      const isAdminOrModerator = authEntity.isAdmin() || authEntity.isModerator()
      navigate(isAdminOrModerator ? path.admin.dashboard : path.home)

      toastifyCommon.success('Đăng nhập thành công')
    },
    onError: (error: AxiosError) => {
      store.loginFailure(error.message)
      handleError(error, 'Đăng nhập thất bại')
    },
    onMutate: () => {
      store.loginStart()
    }
  })
}

export const useRegisterAuth = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: [mutationKeys.register],
    mutationFn: async (data: RegisterReponse) => {
      await authContainer.registerUseCase.execute(data)
    },
    onSuccess: (_, variables) => {
      navigate(path.auth.verifyAccountEmail, { state: { email: variables.email } })
      toastifyCommon.success('Đăng ký thành công')
    },
    onError: (error: AxiosError) => {
      handleError(error, 'Đăng ký thất bại')
    }
  })
}

// Additional clean hooks for auth state
export const useAuthActions = () => {
  const store = useAuthStore()

  return {
    logout: store.logout,
    clearError: store.clearError,
    updateUserProfile: store.updateUserProfile
  }
}

export const useAuthHelpers = () => {
  const store = useAuthStore()

  return {
    hasRole: store.hasRole,
    isAdmin: store.isAdmin,
    isEmployee: store.isEmployee
  }
}
