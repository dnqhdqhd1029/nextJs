/**
 * @file user.tsx
 * @description 사용자 관리 목록 페이지
 */

import dynamic from 'next/dynamic'

const AdminUser = dynamic(() => import('~/components/contents/admin/User'), { ssr: false })

export const AdminUserPage = () => {
  return <AdminUser />
}

export default AdminUserPage
AdminUserPage.Layout = 'LAYOUT1'
