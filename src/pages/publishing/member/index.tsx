/**
 * @file reporter.tsx
 * @description 회원정보
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const ReporterHome = dynamic(() => import('~/publishing/components/contents/member'), {
  ssr: false,
})

export const RepoterHomePage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport menuReporter={true} />
        <ReporterHome />
      </ReporterLayout>
    </>
  )
}

export default RepoterHomePage
RepoterHomePage.Layout = 'BLANK'
