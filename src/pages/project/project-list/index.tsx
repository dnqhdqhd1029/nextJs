/**
 * @file project-search.tsx
 * @description 프로젝트
 */

import dynamic from 'next/dynamic'

const ProjectList = dynamic(() => import('~/components/contents/project/ProjectList'), {
  ssr: false,
})

export const ProjectListPage = () => {
  return <ProjectList />
}

export default ProjectListPage
