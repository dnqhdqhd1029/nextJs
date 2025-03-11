/**
 * @file contact-info.tsx
 * @description 설정 - 회원 - 연락처 정보
 */

import dynamic from 'next/dynamic'

const ContactInfo = dynamic(() => import('~/components/contents/setting/System/ContactInfo'), {
  ssr: false,
})

export const ContactInfoPage = () => {
  return <ContactInfo />
}

export default ContactInfoPage
ContactInfoPage.Layout = 'LAYOUT1'
