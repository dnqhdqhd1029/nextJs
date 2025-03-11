/**
 * @file profile.tsx
 */

import dynamic from 'next/dynamic'

const AdminLicense = dynamic(() => import('~/components/contents/admin/License'), {
  ssr: false,
})

export const AdminLicensePage = () => {
  return <AdminLicense />
}

export default AdminLicensePage
AdminLicensePage.Layout = 'LAYOUT1'
