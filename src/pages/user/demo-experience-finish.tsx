/**
 * @file demo-experience-finish.tsx
 * @description 데모 체험 종료
 */

import dynamic from 'next/dynamic'

const DemoExperienceFinish = dynamic(() => import('~/components/contents/user/DemoExperienceFinish'), {
  ssr: false,
})

export const DemoExperienceFinishPage = () => {
  return <DemoExperienceFinish />
}

export default DemoExperienceFinishPage
DemoExperienceFinishPage.Layout = 'LOGOONLY'
