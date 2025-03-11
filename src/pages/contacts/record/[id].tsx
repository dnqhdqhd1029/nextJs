import dynamic from 'next/dynamic'

const PressProfile = dynamic(() => import('~/components/contents/pressMedia/PressProfile'), {
  ssr: false,
})

export const PressProfilePage = () => {
  return <PressProfile />
}

export default PressProfilePage
PressProfilePage.Layout = 'LAYOUT4'
