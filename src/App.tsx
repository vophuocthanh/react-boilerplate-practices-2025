import AutoScrollToTop from '@/components/scroll/auto-scroll-to-top'
import useRoutesElements from '@/hooks/routes/use-router-element'

function App() {
  const routerDom = useRoutesElements()
  return (
    <>
      <AutoScrollToTop behavior='smooth' />
      {routerDom}
    </>
  )
}

export default App
