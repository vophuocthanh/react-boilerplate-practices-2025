import { z } from 'zod'

import { numberConstants } from '@/configs/consts'

export const LoginSchema = z.object({
  email: z.string().min(numberConstants.TWO, {
    message: 'Email is valid.'
  }),
  password: z.string().min(numberConstants.SIX, {
    message: 'Password must be at least 6 characters.'
  })
})
