/**
 * @file management.tsx
 * @description 맞춤 검색 관리 페이지
 */

import dynamic from 'next/dynamic'

const MediaSearchManagement = dynamic(() => import('~/components/contents/pressMedia/SearchManagement/Media'), {
  ssr: false,
})

export const MediaSearchManagementPage = () => {
  return <MediaSearchManagement />
}

export default MediaSearchManagementPage
