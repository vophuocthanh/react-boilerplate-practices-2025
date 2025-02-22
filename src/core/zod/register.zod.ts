import { z } from 'zod'
import { validator } from '../helpers/validator'
import { numberConstants } from '@/configs/consts'

export const RegisterSchema = z.object({
  name: z.string().min(numberConstants.TWO, {
    message: 'Name is valid.'
  }),
  email: z.string().min(numberConstants.TWO, {
    message: 'Email is valid.'
  }),
  password: z
    .string()
    .min(numberConstants.ONE, {
      message: 'Password is required'
    })
    .regex(validator.passwordRegex, {
      message: 'Password must be at least 6 characters long, contain at least one uppercase letter and one number'
    }),
  confirmPassword: z
    .string()
    .min(numberConstants.ONE, {
      message: 'Password is required'
    })
    .regex(validator.passwordRegex, {
      message: 'Password must be at least 6 characters long, contain at least one uppercase letter and one number'
    }),
  phone: z.string().min(numberConstants.TEN, {
    message: 'Phone number must be at least 10 characters.'
  })
})
