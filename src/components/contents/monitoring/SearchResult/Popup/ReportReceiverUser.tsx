import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import ReportUserEmailCheckBox from '~/components/contents/monitoring/SearchResult/Popup/ReportUserEmailCheckBox'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const ReportReceiverUser = () => {
  const {
    reportPopup,
    setMonitoringReportPopupActivityOpenOpen,
    setMonitoringReportPopupKeywordsOnChange,
    setMonitoringReportPopupKeywordsDelete,
  } = useMonitoringSearchResult()
  const { getInputRef } = useValidate()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const activityOpenRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((e: MouseEvent) => {
    console.log('in')
    if (activityOpenRef.current && !activityOpenRef.current.contains(e.target as Node)) {
      console.log('activityOpenRef', activityOpenRef.current)
      setMonitoringReportPopupActivityOpenOpen(false)
    }
  }, [])

  console.log('reportPopup.keywordList', reportPopup.keywordList)
  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className="select-form__group"
      ref={activityOpenRef}
    >
      <button
        className="select-form__label"
        onClick={() => setMonitoringReportPopupActivityOpenOpen(!reportPopup.activityOpen)}
      >
        <span className="select-form__label-text">선택</span>
        <IcoSvg data={icoSvgData.chevronDown} />
      </button>
      <div className={cn('select-form-option__section', { 'display-block': reportPopup.activityOpen })}>
        <div className="select-form-option__area">
          <ul className="select-form-option__group">
            <li>
              <div className="lnb-filter__search">
                <FormInputSearch
                  id={'list-search' + 'sharedPopup'}
                  name={'list-search' + 'sharedPopup'}
                  onChange={e => setMonitoringReportPopupKeywordsOnChange(e.target.value, reportPopup)}
                  getInputRef={ref => getInputRef(ref, searchInputRef)}
                  onKeyUp={() =>
                    setMonitoringReportPopupKeywordsOnChange(searchInputRef?.current?.value || '', reportPopup)
                  }
                  value={reportPopup.keyword}
                  onDeleteButtonClick={() => setMonitoringReportPopupKeywordsDelete(reportPopup)}
                />
              </div>
            </li>
            {reportPopup.keywordList &&
              reportPopup.keywordList.length > 0 &&
              reportPopup.keywordList.map(i => (
                <ReportUserEmailCheckBox
                  key={'sharedPopup_filterSearchData' + i.id}
                  {...i}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReportReceiverUser
