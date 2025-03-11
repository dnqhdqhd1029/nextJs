/**
 * @file activity-search.tsx
 * @description 활동 페이지
 */

import dynamic from 'next/dynamic'

const ActivityList = dynamic(() => import('~/components/contents/activity/search'), {
  ssr: false,
})

export const ActivityListPage = () => {
  return <ActivityList />
}

export default ActivityListPage
