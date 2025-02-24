import { Header } from '@/components'

const HomePage = () => {
  return (
    <div className='relative min-h-screen'>
      <div className='absolute gradient-background white-background z-0' />
      <div className='relative z-10'>
        <Header />
      </div>
    </div>
  )
}

export default HomePage
