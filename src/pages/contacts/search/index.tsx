import dynamic from 'next/dynamic'

const PressMediaSearch = dynamic(() => import('~/components/contents/pressMedia/PressSearch'), {
  ssr: false,
})

export const PressMediaSearchPage = () => {
  return <PressMediaSearch />
}

export default PressMediaSearchPage
