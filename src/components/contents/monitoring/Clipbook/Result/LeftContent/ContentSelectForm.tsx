import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SelectItems from '~/components/contents/monitoring/Clipbook/Result/LeftContent/SelectItems'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const ContentSelectForm = () => {
  const { clipbookCategory, clipbookDataCatgory } = useClipbookDetail()

  const [isOpen, setIsOpen] = useState(false)
  const filterOpenRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (filterOpenRef.current && !filterOpenRef.current.contains(e.target as Node)) setIsOpen(() => false)
    },
    [isOpen]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className={cn('select-form__section select-form-btn is-filtered', { 'is-selected': isOpen })}
      ref={filterOpenRef}
    >
      <div className="select-form__group">
        {clipbookCategory && clipbookCategory.length > 0 ? (
          <button
            className="select-form__label"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="select-form__label-text">{clipbookDataCatgory && clipbookDataCatgory.title}</span>
            <IcoSvg data={!isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </button>
        ) : (
          <button className="select-form__label">
            <span className="select-form__label-text">데이터가 없습니다.</span>
          </button>
        )}

        <div className={cn('select-form-option__section', { 'display-block': isOpen })}>
          <div className="select-form-option__area">
            {clipbookCategory &&
              clipbookCategory.length > 0 &&
              clipbookCategory.map(e => (
                <Fragment key={'clipbookNewsList__aselect-form-option__area_group-title' + e.categoryNm}>
                  <h6 className="select-form-option__group-title">{e.categoryNm}</h6>
                  <ul className="select-form-option__group">
                    {e.content &&
                      e.content.length > 0 &&
                      e.content.map(i => (
                        <SelectItems
                          key={'clipbookNewsList__select-form-option-type1' + i.clipBookId}
                          {...i}
                        />
                      ))}
                  </ul>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentSelectForm
