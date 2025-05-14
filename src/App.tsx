import AutoScrollToTop from '@/components/scroll/auto-scroll-to-top'
import useRoutesElements from '@/hooks/routes/use-router-element'

const App = () => {
  const router = useRoutesElements()

  return (
    <>
      <AutoScrollToTop behavior='smooth' />
      {router}
    </>
  )
}

export default App
