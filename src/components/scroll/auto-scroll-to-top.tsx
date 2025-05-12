import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

interface AutoScrollToTopProps {
  behavior?: ScrollBehavior
  disabled?: boolean
  smooth?: boolean
}

const AutoScrollToTop = ({ behavior = 'auto', disabled = false, smooth = false }: AutoScrollToTopProps) => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (disabled) return

    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : behavior
    })
  }, [pathname, behavior, disabled, smooth])

  return null
}

export default AutoScrollToTop
