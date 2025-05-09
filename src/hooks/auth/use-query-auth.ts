import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { type z } from 'zod'

import { path } from '@/core/constants/path'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import toastifyCommon from '@/core/lib/toastify-common'
import { authApi } from '@/core/services/auth.service'
import { type LoginSchema } from '@/core/zod/login.zod'
import { type RegisterSchema } from '@/core/zod/register.zod'

export const useLoginAuth = () => {
  return useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data)
  })
}

export const useRegisterAuth = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: [mutationKeys.register],
    mutationFn: (data: z.infer<typeof RegisterSchema>) => authApi.register(data),
    onSuccess: () => {
      toastifyCommon.success('Đăng ký thành công')
      navigate(path.login)
    },
    onError: () => {
      toastifyCommon.error('Đăng ký thất bại')
    }
  })
}
