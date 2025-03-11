/**
 * @file profile.tsx
 */

import dynamic from 'next/dynamic'

const AdminCompany = dynamic(() => import('~/components/contents/admin/Company'), {
  ssr: false,
})

export const AdminCompanyPage = () => {
  return <AdminCompany />
}

export default AdminCompanyPage
AdminCompanyPage.Layout = 'LAYOUT1'
