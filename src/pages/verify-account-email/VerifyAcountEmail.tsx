import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { type z } from 'zod'

import Logo from '@/components/logo/logo'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { path } from '@/core/constants/path'
import { VerifyAccountEmailSchema } from '@/core/zod/verify-account-email.zod'
import { useResendVerificationCode, useVerifyAccountEmail } from '@/hooks/tanstack-query/auth/use-query-auth'
import { containerVariants, itemVariants } from '@/styles/variant/style-variant'
const RESEND_COUNTDOWN = 60

export default function VerifyEmail() {
  const location = useLocation()
  const [countdown, setCountdown] = useState<number>(RESEND_COUNTDOWN)
  const [canResend, setCanResend] = useState<boolean>(false)

  const form = useForm<z.infer<typeof VerifyAccountEmailSchema>>({
    resolver: zodResolver(VerifyAccountEmailSchema),
    defaultValues: {
      email: '',
      verificationCode: ''
    }
  })

  useEffect(() => {
    const email = location.state?.email
    if (email) {
      form.setValue('email', email)
    }
  }, [form, location.state])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0) {
      setCanResend(true)
    }
    return () => clearInterval(timer)
  }, [countdown, canResend])

  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyAccountEmail()

  const { mutate: resendCode, isPending: isResending } = useResendVerificationCode({
    setCountdown,
    setCanResend
  })

  const handleVerify = useCallback(
    (data: z.infer<typeof VerifyAccountEmailSchema>) => {
      verifyEmail(data)
    },
    [verifyEmail]
  )

  const handleResendCode = useCallback(() => {
    const email = form.getValues('email')
    if (email) {
      resendCode(email)
    }
  }, [form, resendCode])

  return (
    <div className='flex justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className='items-center justify-center hidden w-full md:flex'
      >
        <img
          src='https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4585.jpg'
          alt='Email Verification'
          className='my-10 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 ml-44'
        />
      </motion.div>
      <div className='flex items-center justify-center w-full mx-auto my-auto md:justify-between md:max-w-[90rem] md:ml-80 md:mr-[8rem]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='flex flex-col items-center w-full space-y-2 md:items-start'
        >
          <motion.div variants={itemVariants} className='w-40 mb-10'>
            <Logo />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className='text-5xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
          >
            Verify Your Account
          </motion.h1>
          <motion.p variants={itemVariants} className='text-sm text-gray-600 text-center md:text-left px-10 md:px-0'>
            We've sent a verification code to your email address. Please enter it below to verify your account.
          </motion.p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVerify)} className='w-10/12 space-y-6 '>
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your email'
                          type='email'
                          {...field}
                          className='transition-all duration-300 focus:ring-2 focus:ring-indigo-500'
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name='verificationCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Verification Code</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                          containerClassName='gap-2 w-full'
                        >
                          <InputOTPGroup className='w-full justify-between'>
                            <InputOTPSlot index={0} className='flex-1' />
                            <InputOTPSlot index={1} className='flex-1' />
                            <InputOTPSlot index={2} className='flex-1' />
                            <InputOTPSlot index={3} className='flex-1' />
                            <InputOTPSlot index={4} className='flex-1' />
                            <InputOTPSlot index={5} className='flex-1' />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants} className='flex flex-col space-y-4'>
                <Button
                  loading={isVerifying}
                  className='w-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                  type='submit'
                >
                  Verify Email
                </Button>
                <div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
                  <span>Didn't receive the code?</span>
                  <button
                    type='button'
                    onClick={handleResendCode}
                    disabled={!canResend || isResending}
                    className={`${
                      canResend && !isResending
                        ? 'text-indigo-600 hover:text-indigo-700 hover:underline'
                        : 'text-gray-400 cursor-not-allowed'
                    } transition-colors duration-300`}
                  >
                    {isResending ? 'Sending...' : canResend ? 'Resend Code' : `Resend in ${countdown}s`}
                  </button>
                </div>
              </motion.div>

              <motion.p variants={itemVariants} className='flex items-center justify-center text-gray-600'>
                Already verified?&nbsp;
                <Link
                  to={path.login}
                  className='text-indigo-600 hover:text-indigo-700 hover:underline transition-colors duration-300'
                >
                  Sign in
                </Link>
              </motion.p>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  )
}
