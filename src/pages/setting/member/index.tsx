/**
 * @file profile.tsx
 */

import dynamic from 'next/dynamic'

const UserProfile = dynamic(() => import('~/components/contents/userSetting/UserProfile'), {
  ssr: false,
})

export const ProfilePage = () => {
  return <UserProfile />
}

export default ProfilePage
ProfilePage.Layout = 'LAYOUT4'
