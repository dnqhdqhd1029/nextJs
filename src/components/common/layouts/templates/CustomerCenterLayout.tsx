/**
 * @file SubLayout.tsx
 * @description 서브 레이아웃
 */

import { ReactNode } from 'react'

import HeaderCs from '~/components/common/layouts/HeaderCs'
import RequestPopup from '~/components/contents/customerCenter/popup/RequestPopup'
import RequestPopupNonUser from '~/components/contents/customerCenter/popup/RequestPopupNonUser'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="mb-wrap layout4 layout6">
      <HeaderCs />
      {children}
      <RequestPopupNonUser />
      <RequestPopup />
    </div>
  )
}

export default Layout
