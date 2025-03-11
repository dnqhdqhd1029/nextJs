/**
 * @file FilterDropdownIcon.tsx
 * @description 드랍다운 아이콘
 */
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'

interface Props {
  isOpen: boolean
}

const openIcon = icoSvgData.chevronUp
const closeIcon = icoSvgData.chevronDown

const FilterDropdownIcon = ({ isOpen }: Props) => {
  return (
    <span className="lnb-filter__menu-ico type-chevron cursor-pointer">
      <IcoSvg data={isOpen ? openIcon : closeIcon} />
    </span>
  )
}

export default FilterDropdownIcon
