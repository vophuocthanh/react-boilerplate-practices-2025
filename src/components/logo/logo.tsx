import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { ROUTE } from '@/core/constants/path'

const Logo = ({ className = '' }) => {
  return (
    <Link to={ROUTE.HOME}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center space-x-2 ${className}`}
      >
        <div className='relative'>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className='w-10 h-10 bg-blue-600 rounded-lg'
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className='absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded -translate-x-1/2 -translate-y-1/2'
          />
        </div>
        <span className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400'>
          React Boilerplate
        </span>
      </motion.div>
    </Link>
  )
}

export default Logo
