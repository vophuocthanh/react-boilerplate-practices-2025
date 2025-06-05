import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const steps = [
  {
    key: 'clone',
    icon: Terminal
  },
  {
    key: 'install',
    icon: Terminal
  },
  {
    key: 'start',
    icon: Terminal
  },
  {
    key: 'build',
    icon: Terminal
  }
]

export const GettingStartedSection = () => {
  const { t } = useTranslation('home')

  return (
    <section id='getting-started' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            {t('home.gettingStarted.title')}
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            {t('home.gettingStarted.description')}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'
            >
              <div className='flex items-start'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4'>
                  <step.icon className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                    {t(`home.gettingStarted.${step.key}.title`)}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 mb-4'>
                    {t(`home.gettingStarted.${step.key}.description`)}
                  </p>
                  <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <code
                            className='text-sm text-gray-900 dark:text-gray-100 truncate w-40 sm:w-64 md:w-[28rem] block'
                            title={t(`home.gettingStarted.${step.key}.code`)}
                          >
                            {t(`home.gettingStarted.${step.key}.code`)}
                          </code>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t(`home.gettingStarted.${step.key}.code`)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
