/**
 * @file profile.tsx
 */

import dynamic from 'next/dynamic'

const AdminMain = dynamic(() => import('~/components/contents/admin/Main'), {
  ssr: false,
})

export const AdminMainPage = () => {
  return <AdminMain />
}

export default AdminMainPage
AdminMainPage.Layout = 'LAYOUT1'
