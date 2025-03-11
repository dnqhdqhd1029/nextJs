/**
 * @file GuideLayout.tsx
 * @description 가이드 레이아웃
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
  return (
    <>
      <section className="guide__section">{children}</section>
    </>
  )
}

export default Layout
