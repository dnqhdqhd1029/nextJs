/**
 * @file tag.tsx
 * @description 태그 테스트
 */

import dynamic from 'next/dynamic'

const TagComponent = dynamic(() => import('~/components/example/TagComponent'), { ssr: false })

export const TranslatePage = () => {
  return <TagComponent />
}

export default TranslatePage
TranslatePage.Layout = 'BLANK'
