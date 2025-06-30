import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import Logo from '@/components/logo/logo'
import { path } from '@/core/constants/path'
import LoginForm from '@/features/auth/presentation/components/login-form.component'
import { useAuthRedirect } from '@/hooks/auth/use-auth-redirect'

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'TailwindCSS', icon: '🎨' },
  { name: 'Vite', icon: '⚡' },
  { name: 'React Query', icon: '🔄' },
  { name: 'Zod', icon: '✨' }
]

export default function Login() {
  useAuthRedirect()

  return (
    <div className='flex justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='flex items-center justify-between w-full px-4 mx-auto my-8 max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl'
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

          {/* Clean Architecture Login Form */}
          <LoginForm />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-center'
          >
            <p className='text-gray-600'>
              Chưa có tài khoản?{' '}
              <Link
                to={path.auth.register}
                className='font-medium text-indigo-600 hover:text-indigo-800 hover:underline'
              >
                Đăng ký ngay
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Tech Stack Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='hidden space-y-8 lg:flex lg:flex-col lg:justify-center lg:max-w-lg'
        >
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Sức mạnh của{' '}
              <span className='text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text'>
                Modern Stack
              </span>
            </h2>
            <p className='text-lg text-gray-600'>
              Trải nghiệm ứng dụng được xây dựng với những công nghệ tiên tiến nhất
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className='flex items-center p-4 space-x-3 transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-lg'
              >
                <span className='text-2xl'>{tech.icon}</span>
                <span className='font-medium text-gray-900'>{tech.name}</span>
              </motion.div>
            ))}
          </div>

          <div className='p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl'>
            <h3 className='mb-2 font-semibold text-gray-900'>🚀 Clean Architecture</h3>
            <p className='text-sm text-gray-600'>
              Dự án được tổ chức theo mô hình Clean Architecture với tách biệt rõ ràng giữa các layer: Domain, Data, và
              Presentation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
