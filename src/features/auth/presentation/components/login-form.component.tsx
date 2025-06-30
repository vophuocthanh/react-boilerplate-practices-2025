import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { type z } from 'zod'

import { IconEye, IconNonEye } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { REMEMBER_ME, PASSWORD_TYPE, TEXT_TYPE } from '@/core/configs/consts'
import { path } from '@/core/constants/path'
import { containerVariants, itemVariants } from '@/core/lib/variant/style-variant'
import { useAuthStore } from '@/core/store/features/auth/authStore'
import { LoginSchema } from '@/core/zod'
import { type RememberMeData } from '@/models/interface/auth.interface'

import { useLoginAuth } from '../hooks/use-auth.hook'

interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { isLoading } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    const savedData = localStorage.getItem(REMEMBER_ME)
    if (savedData) {
      const parsedData = JSON.parse(savedData) as RememberMeData
      return parsedData.isRemembered
    }
    return false
  })

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: loginMutation } = useLoginAuth()

  const handleSubmit = useCallback(
    (data: z.infer<typeof LoginSchema>) => {
      loginMutation(data, {
        onSuccess
      })
    },
    [loginMutation, onSuccess]
  )

  const handleTogglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  const handleChangeRememberMe = (event: boolean) => {
    setRememberMe(event)
    const loginData = form.getValues()

    if (event) {
      const rememberMeData: RememberMeData = {
        email: loginData.email,
        password: loginData.password,
        isRemembered: true
      }
      localStorage.setItem(REMEMBER_ME, JSON.stringify(rememberMeData))
    } else {
      localStorage.removeItem(REMEMBER_ME)
    }
  }

  useEffect(() => {
    const savedData = localStorage.getItem(REMEMBER_ME)
    if (savedData) {
      const parsedData = JSON.parse(savedData) as RememberMeData
      if (parsedData.isRemembered) {
        form.setValue('email', parsedData.email)
        form.setValue('password', parsedData.password)
      }
    }
  }, [form])

  return (
    <Form {...form}>
      <motion.form
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-6'
      >
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập email của bạn' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập mật khẩu của bạn'
                    className='w-full'
                    type={isPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                    {...field}
                    icon={isPasswordVisible ? <IconNonEye /> : <IconEye />}
                    iconOnClick={handleTogglePasswordVisibility}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='remember-me'
              className='w-4 h-4'
              checked={rememberMe}
              onCheckedChange={handleChangeRememberMe}
            />
            <Label htmlFor='remember-me' className='text-sm text-gray-600 cursor-pointer'>
              Ghi nhớ đăng nhập
            </Label>
          </div>
          <Link to={path.auth.forgotPassword} className='text-sm text-indigo-600 hover:text-indigo-800 hover:underline'>
            Quên mật khẩu?
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            loading={isLoading}
            className='w-full text-white transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
            type='submit'
          >
            Đăng nhập
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  )
}

export default LoginForm
