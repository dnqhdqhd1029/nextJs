/**
 * @file index.tsx
 * @description 언론인
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const JournalistHome = dynamic(() => import('~/components/contents/journalist'), {
  ssr: false,
})

export const JournalistHomePage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport menuReporter={true} />
        <JournalistHome />
      </ReporterLayout>
    </>
  )
}

export default JournalistHomePage
JournalistHomePage.Layout = 'BLANK'
