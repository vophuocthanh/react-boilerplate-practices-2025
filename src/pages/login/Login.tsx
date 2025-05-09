import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { isEqual } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { type z } from 'zod'

import { IconEye, IconNonEye } from '@/assets/icons'
import Logo from '@/components/logo/logo'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_TYPE, ROLE_ADMIN, ROLE_EMPLOYEE, TEXT_TYPE } from '@/configs/consts'
import { REMEMBER_ME } from '@/core/configs/const'
import { path } from '@/core/constants/path'
import toastifyCommon from '@/core/lib/toastify-common'
import { containerVariants, itemVariants } from '@/core/lib/variant/style-variant'
import { setToken, setUserToLS } from '@/core/shared/storage'
import { LoginSchema } from '@/core/zod'
import { useLoginAuth } from '@/hooks/auth/use-query-auth'

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'TailwindCSS', icon: '🎨' },
  { name: 'Vite', icon: '⚡' },
  { name: 'React Query', icon: '🔄' },
  { name: 'Zod', icon: '✨' }
]

export default function Login() {
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(localStorage.getItem(REMEMBER_ME) === 'true' ? true : false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: mutationLogin, isPending } = useLoginAuth()

  function onSubmit() {
    const loginData = form.getValues() as z.infer<typeof LoginSchema>
    mutationLogin(loginData, {
      onSuccess: ({ access_token, refresh_token, user }) => {
        setToken(access_token, refresh_token)
        setUserToLS(user)
        navigate(isEqual(user.role, ROLE_ADMIN) || isEqual(user.role, ROLE_EMPLOYEE) ? path.admin.dashboard : path.home)
        toastifyCommon.success('Đăng nhập thành công')
      },
      onError: () => {
        toastifyCommon.error('Đăng nhập thất bại')
      }
    })
  }

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleChangeRememberMe = (event: boolean) => {
    setRememberMe(event)
    localStorage.setItem(REMEMBER_ME, JSON.stringify(event))
  }

  useEffect(() => {
    if (rememberMe) {
      const email = localStorage.getItem('email')
      if (email) {
        form.setValue('email', email)
      }
    }
  }, [form, rememberMe])

  return (
    <div className='flex justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='flex items-center justify-between w-full max-w-7xl mx-auto my-8 px-4'>
        {/* Left side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg'
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
                    onChange={(e) => handleChangeRememberMe((e.target as HTMLInputElement).checked)}
                    checked={rememberMe}
                  />
                  <Label htmlFor='terms' className='text-sm text-gray-600 cursor-pointer'>
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <Link
                  to={path.forgotPassword}
                  className='text-sm text-indigo-600 hover:text-indigo-800 hover:underline'
                >
                  Quên mật khẩu?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  loading={isPending}
                  className='w-full text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transition-all duration-300'
                  type='submit'
                >
                  Đăng nhập
                </Button>
              </motion.div>

              <motion.p variants={itemVariants} className='text-center text-sm text-gray-600'>
                Chưa có tài khoản?{' '}
                <Link to='/register' className='text-indigo-600 hover:text-indigo-800 hover:underline font-medium'>
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
          className='hidden lg:flex flex-col items-center justify-center w-full max-w-md space-y-8'
        >
          <div className='text-center space-y-4'>
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
                className='flex items-center space-x-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'
              >
                <span className='text-2xl'>{tech.icon}</span>
                <span className='font-medium text-gray-800'>{tech.name}</span>
              </motion.div>
            ))}
          </div>

          <div className='text-center space-y-4 mt-8'>
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
