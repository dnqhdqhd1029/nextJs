/**
 * @file user-add.tsx
 * @description 사용자 추가
 */

import dynamic from 'next/dynamic'

const AddNewUser = dynamic(() => import('~/components/contents/admin/AddUser'), { ssr: false })

export const AddNewUserPage = () => {
  return <AddNewUser />
}

export default AddNewUserPage
AddNewUserPage.Layout = 'LAYOUT4'
