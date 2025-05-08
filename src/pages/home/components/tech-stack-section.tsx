import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiJest,
  SiTestinglibrary,
  SiEslint,
  SiPrettier,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel
} from 'react-icons/si'

const techStack = [
  {
    name: 'React',
    icon: SiReact,
    color: 'text-blue-500'
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: 'text-blue-600'
  },
  {
    name: 'TailwindCSS',
    icon: SiTailwindcss,
    color: 'text-cyan-500'
  },
  {
    name: 'Vite',
    icon: SiVite,
    color: 'text-purple-500'
  },
  {
    name: 'Jest',
    icon: SiJest,
    color: 'text-red-500'
  },
  {
    name: 'Testing Library',
    icon: SiTestinglibrary,
    color: 'text-red-600'
  },
  {
    name: 'ESLint',
    icon: SiEslint,
    color: 'text-purple-600'
  },
  {
    name: 'Prettier',
    icon: SiPrettier,
    color: 'text-pink-500'
  },
  {
    name: 'Git',
    icon: SiGit,
    color: 'text-orange-500'
  },
  {
    name: 'GitHub',
    icon: SiGithub,
    color: 'text-gray-900 dark:text-white'
  },
  {
    name: 'Docker',
    icon: SiDocker,
    color: 'text-blue-600'
  },
  {
    name: 'Vercel',
    icon: SiVercel,
    color: 'text-gray-900 dark:text-white'
  }
]

export const TechStackSection = () => {
  const { t } = useTranslation()

  return (
    <section className='py-20 bg-white dark:bg-gray-800'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            {t('home.techStack.title')}
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            {t('home.techStack.description')}
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8'>
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='flex flex-col items-center'
            >
              <div className='w-16 h-16 mb-4'>
                <tech.icon className={`w-full h-full ${tech.color}`} />
              </div>
              <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
