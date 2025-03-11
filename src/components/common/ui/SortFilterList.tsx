/**
 * @file SortFilter.tsx
 * @description 정렬 필터
 */
import { useEffect, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { SortFilterOptionItem } from '~/types/common'

const defaultSortOptionsByOrder: SortFilterOptionItem[] = [
  {
    id: 'desc',
    name: '내림차순',
  },
  {
    id: 'asc',
    name: '오름차순',
  },
]

interface Props {
  sortOptionsByData?: SortFilterOptionItem[]
  sortOptionsByOrder?: SortFilterOptionItem[]
  value?: string[]
  disabled?: boolean
  onChange?: (dataItem: SortFilterOptionItem, orderItem: SortFilterOptionItem, sortValue: string) => void
}

const SortFilter = ({
  sortOptionsByData,
  sortOptionsByOrder = defaultSortOptionsByOrder,
  onChange,
  value,
  disabled = false,
}: Props) => {
  const containerRef = useRef(null)
  const [isLayerShow, setIsLayerShow] = useState(false)
  const [currentDataOption, setCurrentDataOption] = useState<SortFilterOptionItem>(
    sortOptionsByData?.[0] ?? { id: '', name: '' }
  )
  const [currentOrderOption, setCurrentOrderOption] = useState<SortFilterOptionItem>(sortOptionsByOrder[0])

  const handleOptionLayerShow = () => {
    setIsLayerShow(!isLayerShow)
  }

  const handleSelectDataOptionItem = (item: SortFilterOptionItem) => {
    setCurrentDataOption(item)
    setIsLayerShow(false)
    onChange && onChange(item, currentOrderOption, 'data')
  }

  const handleSelectOrderOptionItem = (item: SortFilterOptionItem) => {
    setCurrentOrderOption(item)
    setIsLayerShow(false)
    onChange && onChange(currentDataOption, item, 'order')
  }

  useOuterClick(containerRef, () => {
    setIsLayerShow(false)
  })

  useEffect(() => {
    if (!value || !sortOptionsByData || sortOptionsByData.length === 0) return

    const valueArr = value[0].split('!')

    if (valueArr.length !== 2) return

    const dataOption = sortOptionsByData?.find(item => item.id === valueArr[0])
    const orderOption = sortOptionsByOrder.find(item => item.id === valueArr[1])

    setCurrentDataOption(dataOption ?? sortOptionsByData?.[0] ?? { id: '', name: '' })
    setCurrentOrderOption(orderOption ?? sortOptionsByOrder[0])
  }, [value, sortOptionsByData])

  return (
    <div
      className="select__section select-type1-small select-ico-only select-align-right"
      ref={containerRef}
    >
      <button
        className="select__label ico-size24 box-shadow-none"
        onClick={handleOptionLayerShow}
        disabled={disabled}
      >
        <span className="select__label-text">필터({currentOrderOption?.id === 'desc' ? '내림차순' : '오름차순'})</span>
        <IcoSvg data={currentOrderOption?.id === 'desc' ? icoSvgData.sortDown : icoSvgData.sortDownAlt} />
      </button>

      <div className={cn('select-option__section', { 'display-block': isLayerShow })}>
        <div className="select-option__area">
          {sortOptionsByData && (
            <>
              <h6 className="select-option__group-title">정렬</h6>
              <ul className="select-option__group">
                {sortOptionsByData.map(item => (
                  <li key={item.id}>
                    <button
                      className={cn('select-option__item', { 'is-selected': currentDataOption.id === item.id })}
                      onClick={() => handleSelectDataOptionItem(item)}
                    >
                      <span className="select-option__item-text">{item.name}</span>
                      <span className="select-option__item-ico">
                        <IcoSvg data={icoSvgData.checkThick} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h6 className="select-option__group-title">순서</h6>
          <ul className="select-option__group">
            {sortOptionsByOrder.map(item => (
              <li key={item.id}>
                <button
                  className={cn('select-option__item', { 'is-selected': currentOrderOption.id === item.id })}
                  onClick={() => handleSelectOrderOptionItem(item)}
                >
                  <span className="select-option__item-text">{item.name}</span>
                  <span className="select-option__item-ico">
                    <IcoSvg data={icoSvgData.checkThick} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SortFilter
