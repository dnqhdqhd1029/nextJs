/**
 * @file company-info-info.tsx
 * @description 설정 - 회사 - 회사 정보
 */

import dynamic from 'next/dynamic'

const CompanyInfo = dynamic(() => import('~/components/contents/setting/CompanyInfo'), {
  ssr: false,
})

export const CompanyInfoPage = () => {
  return <CompanyInfo />
}

export default CompanyInfoPage
CompanyInfoPage.Layout = 'LAYOUT1'
