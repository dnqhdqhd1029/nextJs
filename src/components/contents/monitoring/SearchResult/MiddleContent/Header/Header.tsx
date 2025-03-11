import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { defaultFilterOptionsByData } from '~/components/contents/monitoring/SearchResult/defaultData'
import SearchOption from '~/components/contents/monitoring/SearchResult/MiddleContent/Header/SearchOption'
import { SelectListOptionItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const Header = () => {
  const {
    monitoringActivate,
    newsLoading,
    pageCount,
    newsIdParams,
    monitoringParamsExpandButton,
    newsList,
    monitoringParams,
    monitoringListParams,
    monitoringCategoryList,
    monitoringCategoryButton,
    searchContentKeyList,
    setMonitoringCategoryButtonAction,
    setAllSearchContentKeyList,
    userClipbookListAutoSaveData,
    isTagButton,
    toneList,
    tagEdit,
    mediaValuePointList,
    setInitMonitoringReportPopup,
    setSelectedExcelFileData,
    checkAutoRegisterSelectedNewsClipbook,
    openMonitoringPopup,
    moveToResearch,
    handleChangeSort,
  } = useMonitoringSearchResult()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const updateButtonLayerRef = useRef<HTMLDivElement>(null)

  const [isSelected, setIsSelected] = useState(false)
  const [isOption, setIsOption] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const checkActiveId = async () => {
    let checkStatus = false
    let count = 0
    if (searchContentKeyList.length > 0) {
      if (searchContentKeyList.length === pageCount.totalCount) {
        checkStatus = true
      } else {
        if (newsList.length > 0) {
          for await (const eElement of newsList) {
            const find = searchContentKeyList.find(e => e?.newsid === eElement?.newsid)
            if (find) {
              count += 1
            }
          }
          if (newsList.length === count) {
            checkStatus = true
          }
        }
      }
    }
    setIsSelected(() => checkStatus)
  }

  const checkedAll = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(() => e.target.checked)
    setAllSearchContentKeyList(e.target.checked, newsList, searchContentKeyList)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
      if (updateButtonLayerRef.current && !updateButtonLayerRef.current.contains(e.target as Node))
        setIsEdit(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    checkActiveId()
  }, [searchContentKeyList, newsList])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div className="mb-contents-layout__header">
      <div className="search-result__header">
        <ul className="interval-mt10">
          <li>
            <div className="search-result__header-title">
              <h2 className="font-heading--h6">뉴스 검색</h2>
              <Button
                label={'검색 수정'}
                cate={'link-text-arrow'}
                size={'m'}
                color={'secondary'}
                icoLeft={true}
                icoLeftData={icoSvgData.chevronLeft}
                onClick={() => moveToResearch(monitoringParams)}
              />
              <div className="search-result__header-buttons">
                <Button
                  label={'검색 조건 저장'}
                  cate={'default'}
                  size={'s'}
                  color={'tertiary'}
                  disabled={!monitoringActivate}
                  onClick={() => openMonitoringPopup(monitoringCategoryList, monitoringParams)}
                />
              </div>
            </div>
          </li>
          {newsLoading ? (
            <li>
              <div
                className={'search-result__header-tags mt-12 display-flex'}
                style={{ height: 42 }}
              >
                <div className="header-tags__group" />
                <div className="header-tags__button">
                  <button type="button">
                    <IcoSvg data={!monitoringParamsExpandButton ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
                  </button>
                </div>
              </div>
            </li>
          ) : (
            <SearchOption />
          )}
          <li>
            <div className="search-result__header-sort">
              <FormInputBtn
                type="checkbox"
                name={'monitoring_search-result__header-sort'}
                id={'monitoring_search-result__header-sort'}
                label={
                  searchContentKeyList.length === pageCount.totalCount
                    ? `총 ${getCurrencyFormat(pageCount.totalCount)}개`
                    : searchContentKeyList.length > 0
                    ? `${getCurrencyFormat(searchContentKeyList.length)}개 / 총 ${getCurrencyFormat(
                        pageCount.totalCount
                      )}개`
                    : `총 ${getCurrencyFormat(pageCount.totalCount)}개`
                }
                disabled={(newsList && newsList.length < 1) || newsLoading}
                checked={isSelected}
                onChange={e => newsList.length > 0 && checkedAll(e)}
              />
              <div className="header-sort__action">
                <Button
                  label={'클립북에 추가'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={newsLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    newsIdParams &&
                    checkAutoRegisterSelectedNewsClipbook(
                      true,
                      searchContentKeyList,
                      userClipbookListAutoSaveData,
                      newsList,
                      newsIdParams,
                      monitoringListParams
                    )
                  }
                />
                <Button
                  label={'태그 입력'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={newsLoading || searchContentKeyList.length < 1}
                  onClick={() => searchContentKeyList.length > 0 && isTagButton && tagEdit(searchContentKeyList)}
                />
                <Button
                  label={'보고서 만들기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={newsLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 &&
                    setInitMonitoringReportPopup(true, searchContentKeyList, mediaValuePointList, toneList, '')
                  }
                />
                <Button
                  label={'내보내기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  onClick={() => searchContentKeyList.length > 0 && setSelectedExcelFileData(0, '', true)}
                  disabled={newsLoading || searchContentKeyList.length < 1}
                />
              </div>
              <div className="header-sort__filter">
                {!monitoringCategoryButton && (
                  <Button
                    label={'검색'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.search}
                    icoSize={18}
                    onClick={() => setMonitoringCategoryButtonAction(!monitoringCategoryButton)}
                  />
                )}
                {monitoringListParams.sort && monitoringListParams.sort.length > 0 && (
                  <SortFilterList
                    sortOptionsByData={defaultFilterOptionsByData}
                    onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                      handleChangeSort(dataItem, orderItem, monitoringListParams, monitoringParams)
                    }
                    value={monitoringListParams.sort as string[]}
                    disabled={newsLoading || pageCount.totalCount === undefined || pageCount.totalCount === 0}
                  />
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
