import { useEffect, useRef, type RefObject } from 'react'

import { CONSTANTS_MOUSE_DOWN, CONSTANTS_TOUCH_START } from '@/core/helpers/common'

export const useClickOutside = <T extends HTMLElement>(handler: () => void): RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener(CONSTANTS_MOUSE_DOWN, listener)
    document.addEventListener(CONSTANTS_TOUCH_START, listener)

    return () => {
      document.removeEventListener(CONSTANTS_MOUSE_DOWN, listener)
      document.removeEventListener(CONSTANTS_TOUCH_START, listener)
    }
  }, [handler])

  return ref as RefObject<T>
}
