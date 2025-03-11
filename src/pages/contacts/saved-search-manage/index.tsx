/**
 * @file management.tsx
 * @description 맞춤 검색 관리 페이지
 */

import dynamic from 'next/dynamic'

const PressSearchManagement = dynamic(() => import('~/components/contents/pressMedia/SearchManagement/Press'), {
  ssr: false,
})

export const PressSearchManagementPage = () => {
  return <PressSearchManagement />
}

export default PressSearchManagementPage
