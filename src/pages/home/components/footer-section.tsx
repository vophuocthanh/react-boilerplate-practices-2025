import { Github, Twitter, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const currentYear = new Date().getFullYear()

export const FooterSection = () => {
  const { t } = useTranslation()

  return (
    <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>React Boilerplate</h3>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>{t('home.footer.description')}</p>
            <div className='flex space-x-4'>
              <a
                href='https://github.com/vophuocthanh/react-boilerplate-practices-2025'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              >
                <Github className='w-6 h-6' />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              >
                <Twitter className='w-6 h-6' />
              </a>
              <a
                href='mailto:phuocthanh2k03@gmail.com'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              >
                <Mail className='w-6 h-6' />
              </a>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4'>
              {t('home.footer.documentation.title')}
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#getting-started'
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                >
                  {t('home.footer.documentation.gettingStarted')}
                </a>
              </li>
              <li>
                <a
                  href='#features'
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                >
                  {t('home.footer.documentation.features')}
                </a>
              </li>
              <li>
                <a
                  href='#api-reference'
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                >
                  {t('home.footer.documentation.apiReference')}
                </a>
              </li>
              <li>
                <a
                  href='#examples'
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                >
                  {t('home.footer.documentation.examples')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4'>
              {t('home.footer.legal.title')}
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/privacy'
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                >
                  {t('home.footer.legal.privacy')}
                </a>
              </li>
              <li>
                <a href='/terms' className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'>
                  {t('home.footer.legal.terms')}
                </a>
              </li>
              <li>
                <a
                  href='/license'
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                >
                  {t('home.footer.legal.license')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <p className='text-center text-gray-600 dark:text-gray-300'>
            {t('home.footer.copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}
