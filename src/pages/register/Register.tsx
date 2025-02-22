import { IconEye, IconNonEye } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authApi } from '@/core/services/auth.service'
import { RegisterSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: ''
    }
  })

  const mutationRegister = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: z.infer<typeof RegisterSchema>) => authApi.register(data)
  })

  function onSubmit() {
    setIsLoading(true)
    mutationRegister.mutate(form.getValues(), {
      onSuccess: () => {
        navigate('/login')
        toast.success('Register success 🚀🚀⚡⚡')
      },
      onError: () => {
        toast.error('Register failed!')
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex items-center justify-between w-full mx-auto my-auto max-w-[90rem]'>
        <div className='flex flex-col w-full space-y-2'>
          <Link to='/' className='w-40'>
            <img
              src='https://toidicodedao.com/wp-content/uploads/2018/07/react.png?w=1200'
              alt='logo'
              className='w-40 h-12 mb-10'
            />
          </Link>
          <h1 className='text-5xl font-semibold'>Register</h1>
          <p className='text-sm text-[#112211]'>Let’s get you all st up so you can access your personal account.</p>
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
              <div className='flex w-full gap-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập name' {...field} className='w-full' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập phone number' {...field} className='w-full' maxLength={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập confirm password'
                        className='w-full'
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        {...field}
                        icon={isConfirmPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={toggleConfirmPasswordVisibility}
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
                    I agree to all the <span className='text-redCustom'>Terms</span> and{' '}
                    <span className='text-redCustom'>Privacy Policies</span>
                  </Label>
                </div>
              </div>
              <Button loading={isLoading} className='w-full text-white' type='submit'>
                Create Account
              </Button>
              <p className='flex items-center justify-center'>
                Already have an account?&nbsp;{' '}
                <Link to='/login' className='cursor-pointer hover:underline text-redCustom'>
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
