import { z } from 'zod'

export const VerifyAccountEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  verificationCode: z
    .string()
    .min(6, 'Verification code must be 6 characters')
    .max(6, 'Verification code must be 6 characters')
})
