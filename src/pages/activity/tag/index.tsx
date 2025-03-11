/**
 * @file activity-tag.tsx
 * @description 활동 태그 관리 페이지
 */

import dynamic from 'next/dynamic'

const ActivityTagManagement = dynamic(() => import('~/components/contents/activity/tag'), {
  ssr: false,
})

export const ActivityTagPage = () => {
  return <ActivityTagManagement />
}

export default ActivityTagPage
