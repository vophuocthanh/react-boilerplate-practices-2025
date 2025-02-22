import useRoutesElements from '@/hooks/useRouterElement'

function App() {
  const routerDom = useRoutesElements()
  return <>{routerDom}</>
}

export default App
