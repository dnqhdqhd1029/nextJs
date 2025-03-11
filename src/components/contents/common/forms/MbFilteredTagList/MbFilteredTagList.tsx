/**
 * @file MbFilteredTagList.tsx
 * @description 필터링된 태그 리스트
 */
import { Fragment, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tag from '~/components/common/ui/Tag'
import { USESTATE_DELAY_TIME } from '~/constants/common'
import type { FilteredTagItem, FilteredTagList } from '~/types/contents/Common'

interface Props {
  items: FilteredTagList[]
  onTagDelete: (item: FilteredTagItem, parentItem: FilteredTagList) => void
}

const fixedMinHeight = 28
const fixedMaxHeight = 9999

const MbFilteredTagList = ({ items, onTagDelete }: Props) => {
  const itemContainerRef = useRef<HTMLDivElement>(null)
  const [filterItemList, setFilterItemList] = useState<FilteredTagList[]>([])
  const [maxHeight, setMaxHeight] = useState<number>(fixedMinHeight)
  const [isFold, setIsFold] = useState<boolean>(true)
  const [isButtonShow, setIsButtonShow] = useState<boolean>(false)

  const handleChangeFold = () => {
    setIsFold(!isFold)
  }

  const handleTagClose = async (item: FilteredTagItem, parentItem: FilteredTagList) => {
    onTagDelete(item, parentItem)
  }

  const changeButtonShow = () => {
    setTimeout(() => {
      const containerHeight = itemContainerRef?.current?.getBoundingClientRect().height

      if (containerHeight && containerHeight > fixedMinHeight) {
        setIsButtonShow(true)
      } else {
        setIsButtonShow(false)
      }
    }, USESTATE_DELAY_TIME)
  }

  useEffect(() => {
    if (!items) {
      return
    }

    changeButtonShow()

    setFilterItemList(items)
  }, [items])

  useEffect(() => {
    if (isFold) {
      setMaxHeight(fixedMinHeight)
    } else {
      setMaxHeight(fixedMaxHeight)
    }
  }, [isFold])

  useEffect(() => {
    changeButtonShow()
  }, [maxHeight])

  return (
    <div className="search-result__header-tags">
      <div
        className="header-tags__group"
        style={{ maxHeight: maxHeight, overflow: 'hidden' }}
      >
        <div ref={itemContainerRef}>
          {filterItemList.map((item, index) => (
            <Fragment key={`${item.id}-${index}-${uuid()}`}>
              {item.tags.length > 0 && <div className="header-tags__tit">{item.title}</div>}
              {item.tags.map((tag, tagIndex) => (
                <div
                  key={`${tag.id}-${tagIndex}`}
                  className="header-tags__tag"
                >
                  <Tag
                    label={tag.label}
                    cate={'n2'}
                    shape={'round'}
                    close={!tag.isDisableToBeDeleted}
                    onClose={() => handleTagClose(tag, item)}
                  />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="header-tags__button">
        {isButtonShow && (
          <button
            type="button"
            onClick={handleChangeFold}
          >
            <IcoSvg data={isFold ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </button>
        )}
      </div>
    </div>
  )
}

export default MbFilteredTagList
