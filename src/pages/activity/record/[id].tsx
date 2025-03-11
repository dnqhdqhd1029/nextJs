/**
 * @file activity-view.tsx
 * @description 활동 상세 페이지
 */

import dynamic from 'next/dynamic'

const ActivityView = dynamic(() => import('~/components/contents/activity/record'), {
  ssr: false,
})

export const ActivityViewPage = () => {
  return <ActivityView />
}

export default ActivityViewPage
ActivityViewPage.Layout = 'LAYOUT4'
