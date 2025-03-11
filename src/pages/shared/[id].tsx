import dynamic from 'next/dynamic'

const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const SharedLink = dynamic(() => import('~/components/contents/sharedLink'), {
  ssr: false,
})

export const SharedlinkPage = () => {
  return (
    <NoAuthLayout>
      <SharedLink />
    </NoAuthLayout>
  )
}

export default SharedlinkPage
SharedlinkPage.Layout = 'SSR'
