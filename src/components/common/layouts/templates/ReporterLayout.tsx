/**
 * @file reporter.tsx
 * @description 서브 레이아웃
 */

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return <div className="mb-wrap layout reporterWrap">{children}</div>
}

export default Layout
