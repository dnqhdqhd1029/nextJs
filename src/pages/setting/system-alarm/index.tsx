/**
 * @file system-alarm.tsx
 * @description 설정 - 회원 - 시스템 알림
 */

import dynamic from 'next/dynamic'

const SystemAlarm = dynamic(() => import('~/components/contents/setting/System/SystemAlarm'), {
  ssr: false,
})

export const SystemAlarmPage = () => {
  return <SystemAlarm />
}

export default SystemAlarmPage
SystemAlarmPage.Layout = 'LAYOUT1'
