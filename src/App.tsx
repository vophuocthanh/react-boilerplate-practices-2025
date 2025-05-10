import useRoutesElements from '@/hooks/routes/use-router-element'

function App() {
  const routerDom = useRoutesElements()
  return <>{routerDom}</>
}

export default App
