import dynamic from 'next/dynamic'

const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const UnBlockmail = dynamic(() => import('~/components/contents/unBlockMail'), {
  ssr: false,
})

export const UnBlockmailPage = () => {
  return (
    <NoAuthLayout>
      <UnBlockmail />
    </NoAuthLayout>
  )
}

export default UnBlockmailPage
UnBlockmailPage.Layout = 'SSR'
