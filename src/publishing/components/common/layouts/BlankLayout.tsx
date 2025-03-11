/**
 * @file BlankLayout.tsx
 * @description 빈화면 레이아웃
 */
import { ReactNode } from 'react'

/**
 * AppLayoutProps
 */
type AppLayoutProps = {
  /**
   * 자식 요소 타입
   */
  children: ReactNode
}

const Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>
}

export default Layout
