/**
 * @file group.tsx
 * @description 그룹 관리 목록 페이지
 */

import dynamic from 'next/dynamic'

const AdminGroupList = dynamic(() => import('~/components/contents/admin/Group'), { ssr: false })

export const AdminGroupListPage = () => {
  return <AdminGroupList />
}

export default AdminGroupListPage
AdminGroupListPage.Layout = 'LAYOUT1'
