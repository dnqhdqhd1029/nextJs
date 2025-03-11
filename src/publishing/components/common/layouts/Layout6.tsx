/**
 * @file SubLayout.tsx
 * @description 서브 레이아웃
 */

import { ReactNode } from 'react'

import HeaderCs from '~/publishing/components/common/layouts/HeaderCs'

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
    <div className="mb-wrap layout4 layout6">
      <HeaderCs />
      {children}
    </div>
  )
}

export default Layout
