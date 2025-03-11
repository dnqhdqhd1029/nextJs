/**
 * @file help.tsx
 * @description 고객센터
 */

import dynamic from 'next/dynamic'

import CustomerCenterLayout from '~/components/common/layouts/templates/CustomerCenterLayout'

const CustomerCenterHome = dynamic(() => import('~/components/contents/customerCenter'), {
  ssr: false,
})

export const CustomerCenterHomePage = () => {
  return (
    <CustomerCenterLayout>
      <CustomerCenterHome />
    </CustomerCenterLayout>
  )
}

export default CustomerCenterHomePage
CustomerCenterHomePage.Layout = 'BLANK'
