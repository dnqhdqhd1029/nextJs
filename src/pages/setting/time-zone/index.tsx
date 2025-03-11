/**
 * @file time-zone.tsx
 * @description 설정 - 회원 - 표준 시간대
 */

import dynamic from 'next/dynamic'

const TimeZone = dynamic(() => import('~/components/contents/setting/System/TimeZone'), {
  ssr: false,
})

export const StandardTimeZonePage = () => {
  return <TimeZone />
}

export default StandardTimeZonePage
StandardTimeZonePage.Layout = 'LAYOUT1'
