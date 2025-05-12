type Props = {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4'>
      <div className='max-w-lg w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden'>
        {/* Header with gradient background */}
        <div className='h-32 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 relative'>
          <div className='absolute inset-0 bg-black/10'></div>
          <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2'>
            <div className='w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center'>
              <svg className='w-10 h-10 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='pt-12 pb-8 px-8'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white text-center mb-2'>😢 Đã xảy ra lỗi!</h2>
          <p className='text-gray-600 dark:text-gray-300 text-center mb-8'>
            {error.message || 'Đã xảy ra lỗi không mong muốn'}
          </p>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={resetErrorBoundary}
              className='flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              Thử lại
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className='flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/20'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              Về trang chủ
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className='px-8 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700'>
          <p className='text-sm text-gray-500 dark:text-gray-400 text-center'>
            Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ hỗ trợ
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
