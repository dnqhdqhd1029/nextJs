/**
 * @file setting-user.tsx
 * @description 설정 - 홈
 */

import dynamic from 'next/dynamic'

const SettingMain = dynamic(() => import('~/components/contents/setting/System/Main'), {
  ssr: false,
})

export const SettingMainPage = () => {
  return <SettingMain />
}

export default SettingMainPage
SettingMainPage.Layout = 'LAYOUT1'
