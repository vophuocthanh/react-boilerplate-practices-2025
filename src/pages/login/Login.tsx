import { IconEye, IconNonEye } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROLE_ADMIN, ROLE_EMPLOYEE } from '@/configs/consts'
import { authApi } from '@/core/services/auth.service'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/core/shared/storage'
import { LoginSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data)
  })

  function onSubmit() {
    setIsLoading(true)
    mutationLogin.mutate({ ...form.getValues() } as z.infer<typeof LoginSchema>, {
      onSuccess: (data) => {
        setAccessTokenToLS(data.access_token)
        setRefreshTokenToLS(data.refresh_token)
        setUserToLS(data.user)
        if (isEqual(data?.user?.role, ROLE_ADMIN) || isEqual(data?.user?.role, ROLE_EMPLOYEE)) {
          navigate('/admin/dashboard')
        } else {
          navigate('/')
        }
        toast.success('Login success 🚀🚀⚡⚡!')
      },
      onError: () => {
        toast.error('Login failed!')
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex items-center justify-between w-full mx-auto my-auto max-w-[90rem]'>
        <div className='flex flex-col w-full space-y-2'>
          <Link to='/' className='w-40'>
            <img
              src={'https://toidicodedao.com/wp-content/uploads/2018/07/react.png?w=1200'}
              alt='logo'
              className='w-40 h-12 mb-10'
            />
          </Link>
          <h1 className='text-5xl font-semibold'>Login</h1>
          <p className='text-sm text-[#112211]'>Login to access your account</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email' type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập password'
                        className='w-full'
                        type={isPasswordVisible ? 'text' : 'password'}
                        {...field}
                        icon={isPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={togglePasswordVisibility}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                  <Checkbox id='terms' className='w-4 h-4' />
                  <Label htmlFor='terms' className='text-base font-normal text-gray-500 cursor-pointer'>
                    Remember me
                  </Label>
                </div>
                <Link to='/forgot-password' className='text-redCustom hover:underline'>
                  Forgot Password
                </Link>
              </div>

              <Button loading={isLoading} className='w-full text-white' type='submit'>
                Login
              </Button>
              <p className='flex items-center justify-center'>
                Don’t have an account?&nbsp;{' '}
                <Link to='/register' className='cursor-pointer text-redCustom hover:underline'>
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
