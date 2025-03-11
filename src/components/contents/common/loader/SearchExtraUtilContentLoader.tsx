import { CSSProperties } from 'react'
import cn from 'classnames'

import Skeleton from '~/components/common/ui/Skeleton'

interface Props {
  size?: number
  className?: string
  style?: CSSProperties
}

const SearchExtraUtilContentLoader = ({ size = 4, className, style }: Props) => {
  return (
    <div
      className={cn('display-flex justify-content__space-between align-items__center', className)}
      style={style}
    >
      {Array.from({ length: size }).map((_, index) => (
        <Skeleton
          key={`search-extra-util-content-loader-${index}`}
          width="68px"
          height="21px"
          style={{
            marginLeft: index !== 0 ? '14px' : '0',
          }}
        />
      ))}
    </div>
  )
}

export default SearchExtraUtilContentLoader
