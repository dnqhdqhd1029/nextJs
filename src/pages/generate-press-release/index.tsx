/**
 * @file generate-press-release.tsx
 * @description 보도자료 생성
 */

import dynamic from 'next/dynamic'

const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const GeneratePressRelease = dynamic(() => import('~/components/contents/generatePressRelease'), {
  ssr: false,
})

export const GeneratePressReleasePage = () => {
  return (
    <NoAuthLayout>
      <GeneratePressRelease />
    </NoAuthLayout>
  )
}

export default GeneratePressReleasePage
GeneratePressReleasePage.Layout = 'SSR'
