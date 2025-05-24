import { ThemeProvider } from '@/app/providers/theme-provider'
import AutoScrollToTop from '@/components/scroll/auto-scroll-to-top'
import useRoutesElements from '@/hooks/routes/use-router-element'
import '@/styles/theme.css'

const App = () => {
  const router = useRoutesElements()

  return (
    <ThemeProvider>
      <AutoScrollToTop behavior='smooth' />
      {router}
    </ThemeProvider>
  )
}

export default App
