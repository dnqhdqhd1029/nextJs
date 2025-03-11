/**
 * @file register.tsx
 * @description 연락처 추가 메인 페이지
 */

import dynamic from 'next/dynamic'

const AddMain = dynamic(() => import('~/components/contents/pressMedia/RegisterPressMedia'), {
  ssr: false,
})

export const PressMediaRegisterPage = () => {
  return <AddMain />
}

export default PressMediaRegisterPage
PressMediaRegisterPage.Layout = 'LAYOUT3'
