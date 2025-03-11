/**
 * @file mailInfoLink/[id].tsx
 * @description 시스템 발송 링크 통합
 */

import dynamic from 'next/dynamic'

const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const MailInfoLink = dynamic(() => import('~/components/contents/mailinfolink'), {
  ssr: false,
})

export const MailinfolinkPage = () => {
  return (
    <NoAuthLayout>
      <MailInfoLink />
    </NoAuthLayout>
  )
}

export default MailinfolinkPage
MailinfolinkPage.Layout = 'SSR'
