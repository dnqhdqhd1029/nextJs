import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import MediaSelectItems from '~/components/contents/pressMedia/SavedSearch/LeftContent/Media/MediaSelectItems'
import PressSelectItems from '~/components/contents/pressMedia/SavedSearch/LeftContent/Press/PressSelectItems'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const ContentSelectForm = () => {
  const { savedJournalList, isFilterSubParam, listDefine, savedMediaList, savedMediaKey, savedJournalKey } =
    useSavedSearch()
  const [isSelectedJournalNm, setIsSelectedJournalNm] = useState('')
  const [isSelectedMediaNm, setIsSelectedMediaNm] = useState('')
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

  useEffect(() => {
    if (savedMediaKey < 1) return
    const find = savedMediaList.find(e => e.mediaSrchId === savedMediaKey)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedMediaNm(() => find.title)
    }
  }, [savedMediaKey])

  useEffect(() => {
    if (savedJournalKey < 1) return
    const find = savedJournalList.find(e => e.jrnlstSrchId === savedJournalKey)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedJournalNm(() => find.title)
    }
  }, [savedJournalKey])
  return (
    <div
      className={cn('select-form__section select-form-btn is-filtered', { 'is-selected': isOpen })}
      ref={filterOpenRef}
    >
      <div className="select-form__group">
        {savedMediaList.length < 1 && savedJournalList.length < 1 ? (
          <button className="select-form__label">
            <span className="select-form__label-text">데이터가 없습니다.</span>
          </button>
        ) : (
          <button
            className="select-form__label"
            onClick={() => setIsOpen(!isOpen)}
          >
            {listDefine === 'press' ? (
              <span className="select-form__label-text">{isSelectedJournalNm}</span>
            ) : (
              <span className="select-form__label-text">{isSelectedMediaNm}</span>
            )}
            <IcoSvg data={!isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </button>
        )}

        <div className={cn('select-form-option__section', { 'display-block': isOpen })}>
          <div className="select-form-option__area">
            <Fragment>
              <h6 className="select-form-option__group-title">언론인</h6>
              <ul className="select-form-option__group">
                {savedJournalList &&
                  savedJournalList.length > 0 &&
                  savedJournalList.map(i => (
                    <PressSelectItems
                      key={'monitoringList__select-form-option-type1' + i.jrnlstSrchId}
                      {...i}
                    />
                  ))}
              </ul>
            </Fragment>
            <Fragment>
              <h6 className="select-form-option__group-title">미디어</h6>
              <ul className="select-form-option__group">
                {savedMediaList &&
                  savedMediaList.length > 0 &&
                  savedMediaList.map(i => (
                    <MediaSelectItems
                      key={'monitoringList__select-form-option-type1' + i.mediaSrchId}
                      {...i}
                    />
                  ))}
              </ul>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentSelectForm
