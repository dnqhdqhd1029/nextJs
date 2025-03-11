/**
 * @file SettingLayer.tsx
 * @description 설정 레이어
 */

import { CSSProperties, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { SettingItems } from '~/types/contents/Common'
import { useCalcurateLayerPosition } from '~/utils/hooks/common/useCalcurateLayerPosition'

interface Props<T> {
  info: T
  items: SettingItems<T>[]
}

const SettingLayer = <T,>({ info, items }: Props<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [layerStyles, setLayerStyles] = useState<CSSProperties>({
    opacity: 0,
  })
  const [isOpen, setIsOpen] = useState(false)
  const { calcurateLayerPosition, layerRef, targetClassName } = useCalcurateLayerPosition({
    leftTopRef: containerRef,
    widthHeightRef: optionLayer,
    triggerRef: triggerRef,
    scrollTopElement: document.querySelector('.mb-contents-layout__contents'),
    scrollLeftElement: document.querySelector('.mb-container'),
    targetElementRef: optionLayer,
    setIsOpen,
  })

  const handleToggle = () => {
    setIsOpen(!isOpen)
    calcurateLayerPosition()
    if (!isOpen && layerRef.current) {
      setLayerStyles(layerRef.current)
    }
  }

  useOuterClick(containerRef, () => {
    setIsOpen(false)
  })

  const handleClickEvent = (func: (item: T) => void) => {
    setIsOpen(false)
    func(info)
  }

  return (
    <div
      className="select__section select-type1-small select-ico-only select-align-right"
      ref={containerRef}
    >
      <button
        className="select__label ico-size16"
        onClick={handleToggle}
        ref={triggerRef}
      >
        <span className="select__label-text">설정</span>
        <IcoSvg data={icoSvgData.threeDotsVertical} />
      </button>
      <div
        className={cn('select-option__section opacity-0', targetClassName, { 'display-block': isOpen })}
        ref={optionLayer}
        style={{ ...layerStyles }}
      >
        <div className="select-option__area">
          <ul className="select-option__group">
            {items.map((item, index) => (
              <li key={`${item.title}${index}`}>
                <button
                  className="select-option__item"
                  onClick={() => handleClickEvent(item.setFunc)}
                >
                  <span className="select-option__item-text">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingLayer
