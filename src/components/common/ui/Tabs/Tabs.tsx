/**
 * @file Tabs.tsx
 * @description 탭 기능
 */

import { CSSProperties, MouseEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'

import TabsBar from './TabsBar'
import type { TabsItemType } from './TabsItem'
import TabsItem from './TabsItem'

export interface TabItem {
  /** ID */
  id: string

  /** 타이틀 */
  title: string

  /** count */
  count?: number
}

interface Props {
  /** children */
  children?: ReactNode

  /** type */
  type?: string

  /** 탭 아이템 배열 */
  items: TabItem[]

  /** 활성화 index */
  activeId: string

  /** 탭 클릭 후 변경 이벤트 */
  onChange?: (id: string) => void

  classNames?: string

  /** style **/
  style?: CSSProperties

  isLoading?: boolean
}

const Tabs = ({ children, type, items, activeId, onChange, style, classNames, isLoading }: Props) => {
  const refs = useRef<HTMLLIElement[]>([])
  const [tabItems, setTabItems] = useState<TabItem[]>(items)
  const [initialized, setInitialized] = useState(false)
  const [barWidth, setBarWidth] = useState(40)
  const [barLeft, setBarLeft] = useState(0)
  const addingMarginWidth = type === 'medium' || !type ? 30 : 15
  const activeIndex = useMemo(() => tabItems.findIndex(tabItem => tabItem.id === activeId), [tabItems, activeId])
  const [currentIndex, setCurrentIndex] = useState(activeIndex)
  const [motionClass, setMotionClass] = useState('')
  const [isAllSet, setIsAllSet] = useState(false)
  const [tabWidth, setTabWidth] = useState('auto')
  const [isTabLoading, setIsTabLoading] = useState(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>, item: TabsItemType) => {
    e.preventDefault()
    setCurrentIndex(item.index)
    onChange && onChange(item.id)
    setPositions(item.index)
  }

  const setPositions = (index: number) => {
    const liElement = refs?.current[index] as HTMLLIElement
    const spanElement = liElement?.querySelector('span') as HTMLSpanElement
    if (spanElement || liElement) {
      const width = !!spanElement ? spanElement.getBoundingClientRect().width : liElement.getBoundingClientRect().width
      setBarWidth(width)

      let left = 0
      if (index > 0) {
        for (let i = 0; i <= index; i++) {
          if (refs.current[i]) {
            const refEle = refs.current[i] as HTMLLIElement
            if (refEle) {
              if (i === 0) {
                left += refEle.getBoundingClientRect().width
              } else if (i === index) {
                left += addingMarginWidth
              } else {
                left += refEle.getBoundingClientRect().width + addingMarginWidth
              }
            }
          }
        }
      }

      setBarLeft(left)

      setIsAllSet(true)

      if (!isAllSet) {
        setTimeout(() => {
          setMotionClass('activate-motion')
        }, 500)
      }

      setInitialized(true)
    }
  }

  useEffect(() => {
    if (activeId !== '') {
      setCurrentIndex(activeIndex)
      setPositions(activeIndex)
    }
  }, [activeId])

  useEffect(() => {
    setTabItems(items)

    let width = 0
    items.forEach((_, index) => {
      if (refs.current[index] !== undefined) {
        width += refs.current[index]?.getBoundingClientRect()?.width + addingMarginWidth
      }
    })

    setTabWidth(`${width}px`)

    setTimeout(() => {
      setPositions(activeIndex)
    }, 100)
  }, [items])

  useEffect(() => {
    if (isLoading === undefined) {
      return
    }

    setIsTabLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setPositions(currentIndex)
  }, [])

  if (activeId === '') {
    return null
  }

  return (
    <>
      <div
        className={cn('tabs__section', type ? `type1-${type}` : '', classNames)}
        style={style}
      >
        <div className="tabs-menu__group">
          <ul
            className="tabs-menu__list"
            style={{ opacity: isAllSet ? 1 : 0, width: 'auto' }}
          >
            {tabItems && (
              <>
                {tabItems.map((item, index) => (
                  <TabsItem
                    key={item.id}
                    item={{ ...item, index }}
                    activeIndex={currentIndex}
                    refs={refs}
                    handleClick={handleClick}
                  />
                ))}
              </>
            )}
          </ul>
          {initialized && (
            <TabsBar
              isAllSet={isAllSet}
              barLeft={barLeft}
              barWidth={barWidth}
              motionClass={motionClass}
            />
          )}
        </div>
        {children && children}
      </div>
    </>
  )
}

export default Tabs
