import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { type z } from 'zod'

import { IconEye, IconNonEye } from '@/assets/icons'
import Logo from '@/components/logo/logo'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { REMEMBER_ME, PASSWORD_TYPE, TEXT_TYPE } from '@/core/configs/consts'
import { ROUTE } from '@/core/constants/path'
import { containerVariants, itemVariants } from '@/core/lib/variant/style-variant'
import { useAuthStore } from '@/core/store/features/auth/authStore'
import { LoginSchema } from '@/core/zod'
import { useAuthRedirect } from '@/hooks/auth/use-auth-redirect'
import { useLoginAuth } from '@/hooks/tanstack-query/auth/use-query-auth'
import { type RememberMeData } from '@/models/interface/auth.interface'

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'TailwindCSS', icon: '🎨' },
  { name: 'Vite', icon: '⚡' },
  { name: 'React Query', icon: '🔄' },
  { name: 'Zod', icon: '✨' }
]

export default function Login() {
  const { loginStart, loginSuccess, loginFailure, isLoading } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    const savedData = localStorage.getItem(REMEMBER_ME)
    if (savedData) {
      const parsedData = JSON.parse(savedData) as RememberMeData
      return parsedData.isRemembered
    }
    return false
  })

  useAuthRedirect()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: mutationLogin } = useLoginAuth()

  const onSubmit = useCallback(
    (data: z.infer<typeof LoginSchema>) => {
      loginStart()
      mutationLogin(data, {
        onSuccess: (response) => {
          loginSuccess(response.data)
        },
        onError: (error) => {
          loginFailure(error.message)
        }
      })
    },
    [mutationLogin, loginStart, loginSuccess, loginFailure]
  )

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

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
    <div className='flex justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='flex justify-between items-center px-4 mx-auto my-8 w-full max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col p-8 space-y-6 w-full max-w-md bg-white rounded-2xl shadow-lg'
        >
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Logo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='space-y-2'
          >
            <h1 className='text-4xl font-bold text-gray-900'>Chào mừng trở lại!</h1>
            <p className='text-gray-600'>Đăng nhập để tiếp tục trải nghiệm</p>
          </motion.div>

          <Form {...form}>
            <motion.form
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              onSubmit={form.handleSubmit(onSubmit)}
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
                          iconOnClick={togglePasswordVisibility}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants} className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    className='w-4 h-4'
                    checked={rememberMe}
                    onCheckedChange={handleChangeRememberMe}
                  />
                  <Label htmlFor='terms' className='text-sm text-gray-600 cursor-pointer'>
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <Link
                  to={ROUTE.AUTH.FORGOT_PASSWORD}
                  className='text-sm text-indigo-600 hover:text-indigo-800 hover:underline'
                >
                  Quên mật khẩu?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  loading={isLoading}
                  className='w-full text-white bg-indigo-600 transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg'
                  type='submit'
                >
                  Đăng nhập
                </Button>
              </motion.div>

              <motion.p variants={itemVariants} className='text-sm text-center text-gray-600'>
                Chưa có tài khoản?{' '}
                <Link to='/register' className='font-medium text-indigo-600 hover:text-indigo-800 hover:underline'>
                  Đăng ký ngay
                </Link>
              </motion.p>
            </motion.form>
          </Form>
        </motion.div>

        {/* Right side - Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='hidden flex-col justify-center items-center space-y-8 w-full max-w-md lg:flex'
        >
          <div className='space-y-4 text-center'>
            <h2 className='text-3xl font-bold text-gray-900'>Công nghệ hiện đại</h2>
            <p className='text-gray-600'>Được xây dựng với những công nghệ mới nhất</p>
          </div>

          <div className='grid grid-cols-2 gap-6 w-full'>
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='flex items-center p-4 space-x-3 bg-white rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg'
              >
                <span className='text-2xl'>{tech.icon}</span>
                <span className='font-medium text-gray-800'>{tech.name}</span>
              </motion.div>
            ))}
          </div>

          <div className='mt-8 space-y-4 text-center'>
            <h3 className='text-xl font-semibold text-gray-900'>Tính năng nổi bật</h3>
            <ul className='space-y-2 text-gray-600'>
              <li>✨ Giao diện hiện đại, thân thiện</li>
              <li>🚀 Hiệu suất tối ưu</li>
              <li>🔒 Bảo mật cao cấp</li>
              <li>📱 Responsive trên mọi thiết bị</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
