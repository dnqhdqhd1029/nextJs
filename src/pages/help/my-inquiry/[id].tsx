/**
 * @file customer-center.tsx
 * @description 고객센터 - 내문의 상세
 */

import dynamic from 'next/dynamic'

import CustomerCenterLayout from '~/components/common/layouts/templates/CustomerCenterLayout'

const MyInquiryDetail = dynamic(() => import('~/components/contents/myInquiry/detail/Detail'), {
  ssr: false,
})

export const MyInquiryDetailPage = () => {
  return (
    <CustomerCenterLayout>
      <MyInquiryDetail />
    </CustomerCenterLayout>
  )
}

export default MyInquiryDetailPage
MyInquiryDetailPage.Layout = 'BLANK'
