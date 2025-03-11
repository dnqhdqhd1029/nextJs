import dynamic from 'next/dynamic'

const MediaProfile = dynamic(() => import('~/components/contents/pressMedia/MediaProfile'), {
  ssr: false,
})

export const MediaProfilePage = () => {
  return <MediaProfile />
}

export default MediaProfilePage
MediaProfilePage.Layout = 'LAYOUT4'
