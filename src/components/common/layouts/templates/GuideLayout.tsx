/**
 * @file GuideLayout.tsx
 * @description 가이드 레이아웃
 */

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <section className="guide__section">{children}</section>
    </>
  )
}

export default Layout
