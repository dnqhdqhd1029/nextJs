import dynamic from 'next/dynamic'

const MediaSearch = dynamic(() => import('~/components/contents/pressMedia/MediaSearch'), {
  ssr: false,
})

export const MediaSearchPage = () => {
  return <MediaSearch />
}

export default MediaSearchPage
