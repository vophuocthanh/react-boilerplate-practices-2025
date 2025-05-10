import Header from '@/components/header-nav/header-nav'
import { FeaturesSection } from '@/pages/home/components/features-section'
import { FooterSection } from '@/pages/home/components/footer-section'
import { GettingStartedSection } from '@/pages/home/components/getting-started-section'
import { HeroSection } from '@/pages/home/components/hero-section'
import { TechStackSection } from '@/pages/home/components/tech-stack-section'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TechStackSection />
        <GettingStartedSection />
      </main>

      <FooterSection />
    </div>
  )
}

export default HomePage
