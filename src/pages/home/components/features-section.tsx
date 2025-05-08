import { motion } from 'framer-motion'
import { Code2, Zap, Rocket, Terminal, Shield, Package } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const features = [
  {
    icon: Code2,
    key: 'typescript'
  },
  {
    icon: Zap,
    key: 'modernStack'
  },
  {
    icon: Rocket,
    key: 'performance'
  },
  {
    icon: Terminal,
    key: 'developerExperience'
  },
  {
    icon: Shield,
    key: 'bestPractices'
  },
  {
    icon: Package,
    key: 'readyToUse'
  }
]

export const FeaturesSection = () => {
  const { t } = useTranslation()

  return (
    <section id='features' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            {t('home.features.title')}
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>{t('home.features.description')}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow'
            >
              <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4'>
                <feature.icon className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                {t('home.features.' + feature.key + '.title')}
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>{t('home.features.' + feature.key + '.description')}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
