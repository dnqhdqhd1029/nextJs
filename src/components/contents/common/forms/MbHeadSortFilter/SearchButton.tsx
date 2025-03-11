/**
 * @file SearchButton.tsx
 * @description 검색 버튼
 */

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

interface Props {
  onToggleShow: () => void
  disabled?: boolean
}

const SearchButton = ({ onToggleShow, disabled = false }: Props) => {
  return (
    <li className="search">
      <Button
        label={'검색'}
        cate={'ico-only'}
        size={'s'}
        color={'body-text'}
        icoLeft={true}
        icoLeftData={icoSvgData.search}
        icoSize={18}
        onClick={onToggleShow}
        disabled={disabled}
      />
    </li>
  )
}

export default SearchButton
