import { z } from 'zod'

import { numberConstants } from '@/configs/consts'

import { validator } from '../helpers/validator'

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
      message: 'Password must be at least 5 characters long, contain at least one uppercase letter and one number'
    }),
  confirmPassword: z
    .string()
    .min(numberConstants.ONE, {
      message: 'Password is required'
    })
    .regex(validator.passwordRegex, {
      message: 'Password must be at least 5 characters long, contain at least one uppercase letter and one number'
    }),
  phone: z.string().min(numberConstants.TEN, {
    message: 'Phone number must be at least 10 characters.'
  })
})
