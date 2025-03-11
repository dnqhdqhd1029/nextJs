/**
 * @file BlankLayout.tsx
 * @description 빈화면 레이아웃
 */
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return <>{children}</>
}

export default Layout
