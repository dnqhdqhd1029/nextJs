/**
 * @file add-project.tsx
 * @description 프로젝트 추가
 */

import dynamic from 'next/dynamic'

const AddProject = dynamic(() => import('~/components/contents/project/AddProject'), {
  ssr: false,
})

export const AddProjectPage = () => {
  return <AddProject />
}

export default AddProjectPage
AddProjectPage.Layout = 'LAYOUT4'
