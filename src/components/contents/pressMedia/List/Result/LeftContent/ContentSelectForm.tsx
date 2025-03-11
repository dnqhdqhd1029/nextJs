import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import MediaSelectItems from '~/components/contents/pressMedia/List/Result/LeftContent/Media/MediaSelectItems'
import PressSelectItems from '~/components/contents/pressMedia/List/Result/LeftContent/Press/PressSelectItems'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const ContentSelectForm = () => {
  const { arrayJournalList, listDefine, arrayMediaList, journalArrayId, mediaArrayId } = usePressMediaListResult()
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
    if (mediaArrayId < 1) return
    const find = arrayMediaList.find(e => e.mediaListId === mediaArrayId)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedMediaNm(() => find.title)
    }
  }, [mediaArrayId])

  useEffect(() => {
    if (journalArrayId < 1) return
    const find = arrayJournalList.find(e => e.jrnlstListId === journalArrayId)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedJournalNm(() => find.title)
    }
  }, [journalArrayId])
  return (
    <div
      className={cn('select-form__section select-form-btn is-filtered', { 'is-selected': isOpen })}
      ref={filterOpenRef}
    >
      <div className="select-form__group">
        {arrayMediaList.length < 1 && arrayJournalList.length < 1 ? (
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
                {arrayJournalList &&
                  arrayJournalList.length > 0 &&
                  arrayJournalList.map(i => (
                    <PressSelectItems
                      key={'PressSelectItems__select-form-option-type1' + i.jrnlstListId}
                      {...i}
                    />
                  ))}
              </ul>
            </Fragment>
            <Fragment>
              <h6 className="select-form-option__group-title">매체</h6>
              <ul className="select-form-option__group">
                {arrayMediaList &&
                  arrayMediaList.length > 0 &&
                  arrayMediaList.map(i => (
                    <MediaSelectItems
                      key={'MediaSelectItems__select-form-option-type' + i.mediaListId}
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
