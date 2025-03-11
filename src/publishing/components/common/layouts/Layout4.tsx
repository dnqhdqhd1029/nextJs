/**
 * @file SubLayout.tsx
 * @description 서브 레이아웃
 */

import { ReactNode } from 'react'

import Header from '~/publishing/components/common/layouts/Header'

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
    <div className="mb-wrap layout4">
      {/* 
        layout4 경우, 
        header에 위아래 알림 박스에 따라 
        "header-breadcrumb__section"
        "mb-lnb__section"
        "mb-rnb__section
        => top, height 값 등 적용 개발 필요. (인라인 적용된 부분들)
        */}
      <Header />
      {children}
    </div>
  )
}

export default Layout
