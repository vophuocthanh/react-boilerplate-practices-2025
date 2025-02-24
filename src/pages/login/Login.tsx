import { IconEye, IconNonEye } from '@/assets/icons'
import { logo } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_TYPE, ROLE_ADMIN, ROLE_EMPLOYEE, TEXT_TYPE } from '@/configs/consts'
import { REMEMBER_ME } from '@/core/configs/const'
import { path } from '@/core/constants/path'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { authApi } from '@/core/services/auth.service'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/core/shared/storage'
import { LoginSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(localStorage.getItem(REMEMBER_ME) === 'true' ? true : false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const mutationLogin = useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data)
  })

  function onSubmit() {
    setIsLoading(true)
    const loginData = form.getValues() as z.infer<typeof LoginSchema>
    mutationLogin.mutate(loginData, {
      onSuccess: ({ access_token, refresh_token, user }) => {
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        setUserToLS(user)
        navigate(isEqual(user.role, ROLE_ADMIN) || isEqual(user.role, ROLE_EMPLOYEE) ? path.admin.dashboard : path.home)
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
    <div className='flex justify-center w-full h-screen'>
      <div className='flex items-center justify-between w-full mx-auto my-auto max-w-[90rem]'>
        <div className='flex flex-col w-full space-y-2 ml-32'>
          <Link to={path.home} className='w-52'>
            <img src={logo} alt='logo' className='w-full h-16 mb-10' />
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
              <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                  <Checkbox
                    id='terms'
                    className='w-4 h-4'
                    onChange={(e) => handleChangeRememberMe((e.target as HTMLInputElement).checked)}
                    checked={rememberMe}
                  />
                  <Label htmlFor='terms' className='text-base font-normal text-gray-500 cursor-pointer'>
                    Remember me
                  </Label>
                </div>
                <Link to={path.forgotPassword} className='text-redCustom hover:underline'>
                  Forgot Password
                </Link>
              </div>

              <Button
                loading={isLoading}
                className='w-full text-white bg-[#4E47FF] hover:bg-[#4E47FF] hover:shadow-lg'
                type='submit'
              >
                Login
              </Button>
              <p className='flex items-center justify-center'>
                Don’t have an account?&nbsp;
                <Link to='/register' className='cursor-pointer text-redCustom hover:underline'>
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
      <div className='w-full'>
        <img
          src='https://livewallp.com/wp-content/uploads/2020/12/Whale-and-sea.jpg'
          alt=''
          className='rounded-lg w-[50rem] h-[50rem] object-cover my-20'
        />
      </div>
    </div>
  )
}
