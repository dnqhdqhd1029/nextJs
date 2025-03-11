import { MouseEvent } from 'react'

import { useSignOut } from '~/utils/hooks/common/useSignOut'

const ContentsUpdateAlarm = () => {
  const { signOut } = useSignOut()

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    signOut()

    location.reload()
  }
  return (
    <>
      <p>
        콘텐츠가 업데이트되었습니다. 원활한 사용을 위해 다시 로그인해 주세요.
        <a
          target="_self"
          onClick={e => handleClick(e)}
          className="ml-12"
        >
          업데이트 및 로그아웃
        </a>
      </p>
    </>
  )
}

export default ContentsUpdateAlarm
