/**
 * @file monitoring-upgrade.tsx
 * @description 모니터링 업그레이드 소개
 */

import dynamic from 'next/dynamic'

const Upgrade = dynamic(() => import('~/components/contents/monitoring/Upgrade'), {
  ssr: false,
})

export const UpgradePage = () => {
  return <Upgrade />
}

export default UpgradePage
UpgradePage.Layout = 'LAYOUT3'
