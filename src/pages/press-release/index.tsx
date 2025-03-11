/**
 * @file press-release.tsx
 * @description 보도자료 배포
 */

import dynamic from 'next/dynamic'

const PressRelease = dynamic(() => import('~/components/contents/distribution/Release/Press'), {
  ssr: false,
})

export const PressReleasePage = () => {
  return <PressRelease />
}

export default PressReleasePage
PressReleasePage.Layout = 'LAYOUT1'
