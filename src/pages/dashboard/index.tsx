/**
 * @file home.tsx
 * @description 홈 페이지
 */
import dynamic from 'next/dynamic'

const DashBoard = dynamic(() => import('~/components/contents/dashboard'), { ssr: false })

const HomePage = () => {
  return <DashBoard />
}

export default HomePage
HomePage.Layout = 'LAYOUT4'
