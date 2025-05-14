import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

interface AnimatedLayoutProps {
  children: React.ReactNode
  isAuthPath: boolean
}

export default function AnimatedLayout({ children, isAuthPath }: AnimatedLayoutProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.key}
        initial={{ opacity: 0, x: isAuthPath ? 20 : 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isAuthPath ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: isAuthPath ? 'absolute' : 'relative', width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
