import { MouseEvent } from 'react'

import { useSignOut } from '~/utils/hooks/common/useSignOut'

interface Props {
  content: string
  title: string
  idKey: string
}

const ContentsAlarm = (props: Props) => {
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    //todo
  }
  return (
    <>
      <p>
        {props.title}
        <a
          target="_self"
          onClick={e => handleClick(e)}
          className="ml-12"
        >
          이동하기
        </a>
      </p>
    </>
  )
}

export default ContentsAlarm
