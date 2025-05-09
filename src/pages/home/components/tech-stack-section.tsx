import { useCallback, useEffect } from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { techStack } from '@/_mocks/data-stack.mock'

export const TechStackSection = () => {
  const { t } = useTranslation()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: true
  })

  const autoplay = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(autoplay, 2000)
    return () => clearInterval(interval)
  }, [emblaApi, autoplay])

  return (
    <section id='tech-stack' className='py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 overflow-hidden'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8 sm:mb-12 md:mb-16'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4'>
            {t('home.techStack.title')}
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            {t('home.techStack.description')}
          </p>
        </div>

        <div className='relative'>
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex-[0_0_50%] sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.666%] min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[20%] xl:min-w-[16.666%] px-2 sm:px-3 md:px-4'
                >
                  <div className='flex flex-col items-center'>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3 md:mb-4'>
                      <tech.icon className={`w-full h-full ${tech.color}`} />
                    </div>
                    <span className='text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 text-center'>
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
