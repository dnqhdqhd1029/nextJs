/**
 * @file reporter.tsx
 * @description 회원가입- step2
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const ReporterHome = dynamic(() => import('~/publishing/components/contents/join/join1'), {
  ssr: false,
})

export const RepoterHomePage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport />
        <ReporterHome />
      </ReporterLayout>
    </>
  )
}

export default RepoterHomePage
RepoterHomePage.Layout = 'BLANK'
