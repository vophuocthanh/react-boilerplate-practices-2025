import useRoutesElements from '@/hooks/use-router-element'

function App() {
  const routerDom = useRoutesElements()
  return <>{routerDom}</>
}

export default App
