/**
 * @file LoadingIcon.tsx
 * @description 로딩 아이콘
 */

import cn from 'classnames'

export type LoadingIconSize = 's18' | 's24' | 's36' | 's48'

interface Props {
  /** 로딩 아이콘 크기 */
  size?: LoadingIconSize
}

const LoadingIcon = ({ size = 's24' }: Props) => {
  return (
    <div className={cn('spinner__group', size)}>
      <img
        src={'/assets/png/spinner.png'}
        alt=""
        width={100}
        height={100}
      />
    </div>
  )
}

export default LoadingIcon
