/**
 * @file media.tsx
 * @description 미디어뉴스 상세
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const ReporterHome = dynamic(() => import('~/publishing/components/contents/media/detail'), {
  ssr: false,
})

export const RepoterHomePage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport menuMain={true} />
        <ReporterHome />
      </ReporterLayout>
    </>
  )
}

export default RepoterHomePage
RepoterHomePage.Layout = 'BLANK'
