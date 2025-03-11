/**
 * @file certification.tsx
 * @description OTP 인증 페이지
 */

import dynamic from 'next/dynamic'

const AdminCertification = dynamic(() => import('~/components/contents/admin/Certification'), { ssr: false })

export const AdminCertificationPage = () => {
  return <AdminCertification />
}

export default AdminCertificationPage
AdminCertificationPage.Layout = 'LAYOUT1'
