/**
 * @file FilterCloseIcon.tsx
 * @description 드랍다운 아이콘
 */
import { MouseEvent } from 'react'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'

interface Props {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const FilterCloseIcon = ({ onClick }: Props) => {
  return (
    <div
      className="lnb-filter__menu-ico type-close display-block cursor-pointer"
      onClick={onClick && onClick}
    >
      <IcoSvg data={icoSvgData.iconCloseButton2} />
    </div>
  )
}

export default FilterCloseIcon
