import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { type z } from 'zod'

import { ROLE_ADMIN, ROLE_EMPLOYEE } from '@/core/configs/consts'
import isEqual from '@/core/configs/is-equal'
import { ROUTE } from '@/core/constants/path'
import { handleError } from '@/core/helpers/error-handler'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import toastifyCommon from '@/core/lib/toastify-common'
import { authApi } from '@/core/services/auth.service'
import { setToken, setUserToLS } from '@/core/shared/storage'
import { type LoginSchema } from '@/core/zod/login.zod'
import { type RegisterSchema } from '@/core/zod/register.zod'
import { type VerifyAccountEmailSchema } from '@/core/zod/verify-account-email.zod'
import { type LoginApiResponse } from '@/models/interface/auth.interface'
const RESEND_COUNTDOWN = 60

export const useLoginAuth = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data),
    onSuccess: (response: LoginApiResponse) => {
      const { access_token, refresh_token, user } = response.data
      setToken(access_token, refresh_token)
      setUserToLS(user)
      navigate(isEqual(user.role, ROLE_ADMIN) || isEqual(user.role, ROLE_EMPLOYEE) ? ROUTE.ADMIN.DASHBOARD : ROUTE.HOME)
      toastifyCommon.success('Đăng nhập thành công')
    },
    onError: (error: AxiosError) => {
      handleError(error, 'Đăng nhập thất bại')
    }
  })
}

export const useRegisterAuth = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: [mutationKeys.register],
    mutationFn: (data: z.infer<typeof RegisterSchema>) => authApi.register(data),
    onSuccess: (_, variables) => {
      navigate(ROUTE.AUTH.VERIFY_ACCOUNT_EMAIL, { state: { email: variables.email } })
      toastifyCommon.success('Đăng ký thành công')
    },
    onError: (error: AxiosError) => {
      handleError(error, 'Đăng ký thất bại')
    }
  })
}

export const useVerifyAccountEmail = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: [mutationKeys.verifyEmail],
    mutationFn: (data: z.infer<typeof VerifyAccountEmailSchema>) => authApi.verifyEmail(data),
    onSuccess: () => {
      toastifyCommon.success('Email verified successfully! 🎉')
      navigate(ROUTE.AUTH.LOGIN)
    },
    onError: (error: AxiosError) => handleError(error, 'Failed to verify email')
  })
}

export const useResendVerificationCode = ({
  setCountdown,
  setCanResend
}: {
  setCountdown: (countdown: number) => void
  setCanResend: (canResend: boolean) => void
}) => {
  return useMutation({
    mutationKey: [mutationKeys.resendCode],
    mutationFn: (email: string) => authApi.resendVerificationCode(email),
    onSuccess: () => {
      toastifyCommon.success('Verification code resent! 📧')
      setCountdown(RESEND_COUNTDOWN)
      setCanResend(false)
    },
    onError: (error: AxiosError) => handleError(error, 'Failed to resend verification code')
  })
}
