/**
 * @file myInquiry.tsx
 * @description 고객센터 - 내문의
 */

import dynamic from 'next/dynamic'

import CustomerCenterLayout from '~/components/common/layouts/templates/CustomerCenterLayout'

const MyInquiry = dynamic(() => import('~/components/contents/myInquiry'), {
  ssr: false,
})

export const MyInquiryPage = () => {
  return (
    <CustomerCenterLayout>
      <MyInquiry />
    </CustomerCenterLayout>
  )
}

export default MyInquiryPage
MyInquiryPage.Layout = 'BLANK'
