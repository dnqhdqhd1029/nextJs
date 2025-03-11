import { UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { ContentItem } from '~/components/contents/common/forms/SocialSearchForm/ContentItem'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'

export interface IJournalistSearchFilter {
  [key: string]: Array<{ key: string; value: number }>
}

type filterDataType = {
  [key: string]: any
}

interface Props {
  filter: IJournalistSearchFilter | null
  originList: SelectListOptionItem[]
  keywordParam: MbTagSearchTagItem[]
  setKeywordSocial: (e: MbTagSearchTagItem[]) => void
}

const SocialSearch = (props: Props) => {
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [socialContentList, setSocialContentList] = useState<SelectListOptionItem[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const updateExtraValues = (a: SelectListOptionItem[], b: filterDataType[]) => {
    const bMap = b.reduce((map, item) => {
      const [key, value] = Object.entries(item)[0]
      map[key] = value
      return map
    }, {})
    return a.map(item => ({
      ...item,
      extra: bMap[item.id] !== undefined ? bMap[item.id] : item.extra,
    }))
  }

  const getList = async () => {
    if (!isOpen && props.filter) {
      let temp = updateExtraValues(props.originList, props.filter.filterSocial)
      const res = temp.sort((a, b) => Number(b.extra) - Number(a.extra))
      setSocialContentList(() => res)
    }
    setIsOpen(() => !isOpen)
  }

  const onChngeKeywordSocial = async (i: boolean, e: SelectListOptionItem) => {
    let dataList = [...props.keywordParam]
    if (!i) {
      dataList = [
        ...dataList,
        {
          id: e.id?.toString() ?? '',
          label: e.name ?? '',
        },
      ]
    } else {
      dataList = dataList.filter(k => k.id !== e.id)
    }
    props.setKeywordSocial(dataList)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 100)
        setIsOpen(prevState => false)
      }
    },
    [getOpenRef]
  )

  useEffect(() => {
    if (getOpenRef.current && optionLayer.current) {
      const selectRect = getOpenRef.current.getBoundingClientRect()
      const dropdownRect = optionLayer.current.getBoundingClientRect()
      if (selectRect.bottom + dropdownRect.height >= window.innerHeight) {
        setIsOptionAbove(true)
      } else {
        setIsOptionAbove(false)
      }
    }
  }, [isOpen, getOpenRef.current])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className={cn('select-form__group', {
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      <button
        className="select-form__label"
        onClick={() => {
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 100)
          getList()
        }}
      >
        <span className="select-form__label-text">선택</span>
        <IcoSvg data={icoSvgData.chevronDown} />
      </button>
      <div
        className={cn(
          'select-form-option__section',
          'select-list__direction-up'
          // isOptionAbove ? 'select-list__direction-up' : 'select-list__direction-down'
        )}
        style={{ display: 'block', visibility: isOpen && !isAnimating ? 'visible' : 'hidden' }}
        ref={optionLayer}
      >
        <div className="select-form-option__area auto-complete__max-height">
          <ul className="select-form-option__group">
            <>
              {socialContentList &&
                socialContentList.length > 0 &&
                socialContentList.map(e => {
                  if (e.id !== '') {
                    return (
                      <ContentItem
                        key={'journalistOccupationList' + e.id + e.name}
                        item={e}
                        tagItems={props.keywordParam}
                        onChangeChecked={(i, key) => onChngeKeywordSocial(i, key)}
                      />
                    )
                  }
                })}
            </>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SocialSearch
