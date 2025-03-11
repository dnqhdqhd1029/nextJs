import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  targetElementSelector?: string
}

const Portal = ({ children, targetElementSelector = '#next-portal' }: PortalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // ref 설정
    ref.current = document.querySelector<HTMLElement>(targetElementSelector)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return ref.current ? createPortal(<>{children}</>, ref.current) : <>{children}</>
}

export default Portal
