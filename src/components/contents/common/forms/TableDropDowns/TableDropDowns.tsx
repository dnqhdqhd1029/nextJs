import { useCallback, useEffect, useRef, useState } from 'react'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { SelectListOptionItem } from '~/types/common'

interface Props {
  isOption: boolean
  mainTitle?: string
  itemProps?: unknown
  settingList: SelectListOptionItem[]
  setIsOption: (i: boolean) => void
  tableDropDownAction: (i: SelectListOptionItem, k: unknown) => void
}
const TableDropDownItem = (props: Props) => {
  const optionSectionRef = useRef<HTMLDivElement>(null)
  const [isOptionAbove, setIsOptionAbove] = useState(false)

  useEffect(() => {
    if (optionSectionRef.current) {
      const dropdownRect = optionSectionRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - dropdownRect.bottom
      setIsOptionAbove(() => spaceBelow - dropdownRect.height < 30)
    }
  }, [props.isOption, optionSectionRef.current])

  return (
    <div className="select__section select-type1-small select-ico-only select-align-right">
      <button
        className="select__label ico-size16"
        onClick={() => props.setIsOption(!props.isOption)}
      >
        <span className="select__label-text">{props?.mainTitle || '설정'}</span>
        <IcoSvg data={icoSvgData.threeDotsVertical} />
      </button>
      <div
        className="select-option__section"
        style={{
          display: props.isOption ? 'block' : 'none',
          top: props.isOption && isOptionAbove ? 'auto' : '100%',
          bottom: props.isOption && isOptionAbove ? '100%' : 'auto',
        }}
        ref={optionSectionRef}
      >
        <div className="select-option__area">
          <ul className="select-option__group">
            {props.settingList &&
              props.settingList.map((e, index) => (
                <li
                  key={'props.optionSectionRef' + index}
                  id={'props.optionSectionRef' + index}
                >
                  <button
                    className="select-option__item"
                    onClick={() => props.tableDropDownAction(e, props.itemProps)}
                  >
                    <span className="select-option__item-text">{e.name}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TableDropDownItem
