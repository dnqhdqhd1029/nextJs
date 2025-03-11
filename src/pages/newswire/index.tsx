/**
 * @file newswire.tsx
 * @description 보도자료 배포
 */

import dynamic from 'next/dynamic'

const NewswireRelease = dynamic(() => import('~/components/contents/distribution/NewswireRelease'), {
  ssr: false,
})

export const NewswireReleasePage = () => {
  return <NewswireRelease />
}

export default NewswireReleasePage
NewswireReleasePage.Layout = 'LAYOUT1'
