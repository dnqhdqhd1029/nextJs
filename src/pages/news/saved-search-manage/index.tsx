/**
 * @file monitoring-management.tsx
 * @description 맞춤 검색 관리
 */

import dynamic from 'next/dynamic'

const MonitoringManagement = dynamic(() => import('~/components/contents/monitoring/Management'), {
  ssr: false,
})

export const MonitoringManagementPage = () => {
  return <MonitoringManagement />
}

export default MonitoringManagementPage
