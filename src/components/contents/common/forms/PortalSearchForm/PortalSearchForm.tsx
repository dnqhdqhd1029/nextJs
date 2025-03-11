import { UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { ContentItem } from '~/components/contents/common/forms/PortalSearchForm/ContentItem'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'

export interface IJournalistSearchFilter {
  [key: string]: Array<{ key: string; value: number }>
}

interface Props {
  filter: IJournalistSearchFilter | null
  originList: SelectListOptionItem[]
  keywordParam: MbTagSearchTagItem[]
  setKeywordPortal: (e: MbTagSearchTagItem[]) => void
}

const PortalSearch = (props: Props) => {
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [potalContentList, setPotalContentList] = useState<SelectListOptionItem[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const getList = async () => {
    if (!isOpen && props.filter) {
      const res = await filterAddCount(props.originList, props.filter.filterPortal)
      setPotalContentList(() => res)
    }
    setIsOpen(() => !isOpen)
  }

  const filterAddCount = async (list: SelectListOptionItem[], filteredList: Object[]) => {
    let res: SelectListOptionItem[] = []
    if (filteredList && filteredList) {
      for await (const argument of list) {
        let extra = ''
        if (argument.id !== '') {
          for (const extraElement of filteredList) {
            const find = extraElement
            if (find) {
              for (const [key, value] of Object.entries(find)) {
                if (argument.id.toString() === key.toString()) {
                  extra = value.toString() as string
                }
              }
            }
          }
        }
        res = [
          ...res,
          {
            id: argument.id,
            name: argument.name,
            extra: extra,
          },
        ]
      }
      // // @ts-ignore
      // res.sort((a, b) => {
      //   if (Number(a.extra) < Number(b.extra)) return 1
      //   if (Number(a.extra) > Number(b.extra)) return -1
      //   if (Number(a.extra) === Number(b.extra)) return 0
      // })
    }

    return res
  }

  const onChngeKeywordPortal = async (i: boolean, e: SelectListOptionItem) => {
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
    props.setKeywordPortal(dataList)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
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
      {/* <div className="select-form__group"> */}
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
              {potalContentList &&
                potalContentList.length > 0 &&
                potalContentList.map(e => {
                  if (e.id !== '') {
                    return (
                      <ContentItem
                        key={'journalistOccupationList' + e.id + e.name}
                        item={e}
                        tagItems={props.keywordParam}
                        onChangeChecked={(i, key) => onChngeKeywordPortal(i, key)}
                      />
                    )
                  }
                })}
            </>
          </ul>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default PortalSearch
