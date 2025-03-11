/**
 * @file monitoring.tsx
 * @description 모니터링
 */

import dynamic from 'next/dynamic'

const Monitoring = dynamic(() => import('~/components/contents/monitoring/MonitoringList'), {
  ssr: false,
})

export const MonitoringPage = () => {
  return <Monitoring />
}

export default MonitoringPage
