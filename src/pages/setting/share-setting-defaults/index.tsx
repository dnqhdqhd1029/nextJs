/**
 * @file share-setting-defaults.tsx
 * @description 설정 - 회원 - 공유 설정 기본값
 */

import dynamic from 'next/dynamic'

const ShareSettingDefaults = dynamic(() => import('~/components/contents/setting/System/ShareSetting'), {
  ssr: false,
})

export const SharePolicyPage = () => {
  return <ShareSettingDefaults />
}

export default SharePolicyPage
SharePolicyPage.Layout = 'LAYOUT1'
