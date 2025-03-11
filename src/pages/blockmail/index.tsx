/**
 * @file mailInfoLink/[id].tsx
 * @description 시스템 발송 링크 통합
 */

import dynamic from 'next/dynamic'

const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const Blockmail = dynamic(() => import('~/components/contents/blockmail'), {
  ssr: false,
})

export const BlockmailPage = () => {
  return (
    <NoAuthLayout>
      <Blockmail />
    </NoAuthLayout>
  )
}

export default BlockmailPage
BlockmailPage.Layout = 'SSR'
