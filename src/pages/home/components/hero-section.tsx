import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section id='hero' className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' />

      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-full'
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 2 + 1
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
            {t('home.hero.title')}
          </h1>
          <p className='text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto'>
            {t('home.hero.description')}
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <motion.a
              href='#getting-started'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              {t('home.hero.getStarted')}
            </motion.a>
            <motion.a
              href='https://github.com/vophuocthanh/react-boilerplate-the-best-2025'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            >
              {t('home.hero.viewGithub')}
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
      >
        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center'
        >
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className='w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mt-2'
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
