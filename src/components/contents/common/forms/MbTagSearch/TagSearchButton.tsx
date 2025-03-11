/**
 * @file MbSearchButton.tsx
 * @description 확장 팝업 보이기 버튼
 */
import { MouseEvent, useContext } from 'react'

import { TagSearchContext } from './TagSearchContainer'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'

interface Props {
  onSelectButtonClick?: (isOpen: boolean) => void
}

const MbSearchButton = ({ onSelectButtonClick }: Props) => {
  const { setIsExapandedTagListPopupOpen, setIsInputFocused, isInputFocused, setHighlightedString } =
    useContext(TagSearchContext)

  const handleSelectButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    let isOpen = false

    // 팝업 있을 경우
    if (setIsExapandedTagListPopupOpen) {
      setIsExapandedTagListPopupOpen(true)
      isOpen = true
    }

    // 일반 목록일 경우
    if (setIsInputFocused) {
      setIsInputFocused(!isInputFocused)
      setHighlightedString('input')
      isOpen = isInputFocused
    }

    onSelectButtonClick && onSelectButtonClick(isOpen)
  }

  return (
    <button
      type="button"
      className="button-select-style__button"
      onClick={handleSelectButton}
    >
      <span className="button-select-style__button-txt">선택</span>
      <span className="button-select-style__button-ico">
        <IcoSvg data={icoSvgData.chevronDown} />
      </span>
    </button>
  )
}

export default MbSearchButton
