import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { defaultFilterOptionsByData } from '~/components/contents/monitoring/MonitoringList/defaultData'
import SearchOption from '~/components/contents/monitoring/MonitoringList/MiddleContent/Header/SearchOption'
import { SelectListOptionItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const Header = () => {
  const {
    newsLoading,
    newsIdParams,
    isFilterSubParam,
    monitoringDate,
    pageCount,
    searchActivate,
    newsIdKey,
    isOwner,
    monitoringParamsExpandButton,
    newsList,
    monitoringParams,
    monitoringListParams,
    monitoringCategoryList,
    monitoringCategoryAuth,
    monitoringCategoryData,
    monitoringIdParams,
    monitoringCategoryButton,
    searchContentKeyList,
    setMonitoringCategoryButtonAction,
    setAllSearchContentKeyList,
    isTagButton,
    setIsFilterSubParamAction,
    userClipbookListAutoSaveData,
    tagEdit,
    toneList,
    mediaValuePointList,
    setInitMonitoringReportPopup,
    setSelectedExcelFileData,
    openMonitoringAnalysisPopup,
    openEditPage,
    checkAutoRegisterSelectedNewsClipbook,
    updateMonitroing,
    openMonitoringPopup,
    handleChangeSort,
  } = useMonitoringSearch()
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
              <h2 className="font-heading--h6">{monitoringCategoryData?.title || ''}</h2>
              {monitoringCategoryAuth && (
                <Button
                  label={'검색 수정'}
                  cate={'link-text-arrow'}
                  size={'m'}
                  color={'secondary'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.chevronLeft}
                  onClick={() => openEditPage(true, monitoringParams)}
                />
              )}

              <div className="search-result__header-buttons">
                {!isFilterSubParam && (
                  <Button
                    label={'필터'}
                    cate={'default-ico-text'}
                    size={'s'}
                    color={'tertiary'}
                    icoLeft={true}
                    disabled={newsLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                    icoLeftData={icoSvgData.funnel}
                    onClick={() =>
                      setIsFilterSubParamAction(
                        monitoringIdParams,
                        newsIdKey,
                        monitoringListParams,
                        monitoringParams,
                        isOwner,
                        monitoringDate
                      )
                    }
                  />
                )}
                <Button
                  label={'분석'}
                  cate={'default-ico-text'}
                  size={'s'}
                  color={'tertiary'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.pieChart}
                  disabled={newsLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                  onClick={() =>
                    pageCount.totalCount &&
                    pageCount.totalCount > 0 &&
                    monitoringCategoryData &&
                    openMonitoringAnalysisPopup(true, monitoringCategoryData, monitoringIdParams)
                  }
                />
                {monitoringCategoryAuth && (
                  <Fragment>
                    {!searchActivate ? (
                      <Button
                        label={'검색 조건 저장'}
                        cate={'default'}
                        size={'s'}
                        color={'tertiary'}
                        onClick={() =>
                          updateMonitroing(
                            monitoringListParams,
                            monitoringIdParams,
                            monitoringParams,
                            monitoringDate,
                            isOwner,
                            isFilterSubParam
                          )
                        }
                      />
                    ) : (
                      <div
                        // className="select__section select-type1-small select-type1-tertiary"
                        className={cn('select__section select-type1-small select-type1-tertiary', {
                          'is-show': isOption,
                        })}
                        ref={shareIdOpenRef}
                        style={{ paddingLeft: 5 }}
                      >
                        <button
                          className="select__label"
                          onClick={() => setIsOption(!isOption)}
                        >
                          <span className="select__label-text">검색 조건 저장</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>

                        <div
                          className={cn('select-option__section', { 'display-block': isOption })}
                          style={{ right: 0, left: 'unset' }}
                        >
                          <div className="select-option__area">
                            <ul className="select-option__group">
                              <li>
                                <button
                                  className="select-option__item"
                                  onClick={() => {
                                    setIsOption(false)
                                    updateMonitroing(
                                      monitoringListParams,
                                      monitoringIdParams,
                                      monitoringParams,
                                      monitoringDate,
                                      isOwner,
                                      isFilterSubParam
                                    )
                                  }}
                                >
                                  <span className="select-option__item-text">검색 조건 수정</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className="select-option__item"
                                  onClick={() => {
                                    setIsOption(false)
                                    openMonitoringPopup(monitoringCategoryList, monitoringParams)
                                  }}
                                >
                                  <span className="select-option__item-text">새 모니터링 만들기</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                )}
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
                  onClick={() => searchContentKeyList.length > 0 && tagEdit(searchContentKeyList)}
                />
                {/*<div*/}
                {/*  className="select__section select-type1-small"*/}
                {/*  ref={updateButtonLayerRef}*/}
                {/*>*/}
                {/*  <button*/}
                {/*    className="select__label"*/}
                {/*    onClick={() => setIsEdit(!isEdit)}*/}
                {/*    disabled={newsLoading || searchContentKeyList.length < 1}*/}
                {/*  >*/}
                {/*    <span className="select__label-text">태그 입력</span>*/}
                {/*    <IcoSvg data={icoSvgData.chevronDown} />*/}
                {/*  </button>*/}

                {/*  <div className={cn('select-option__section', { 'display-block': isEdit })}>*/}
                {/*    <div className="select-option__area">*/}
                {/*      <ul className="select-option__group">*/}
                {/*        <li>*/}
                {/*          <button*/}
                {/*            className="select-option__item"*/}
                {/*            onClick={() =>*/}
                {/*              searchContentKeyList.length > 0 && isTagButton && tagEdit(searchContentKeyList)*/}
                {/*            }*/}
                {/*          >*/}
                {/*            <span className="select-option__item-text">태그 입력</span>*/}
                {/*          </button>*/}
                {/*        </li>*/}
                {/*        /!*<li>*!/*/}
                {/*        /!*  <button*!/*/}
                {/*        /!*    className="select-option__item"*!/*/}
                {/*        /!*    disabled={true}*!/*/}
                {/*        /!*  >*!/*/}
                {/*        /!*    <span*!/*/}
                {/*        /!*      className="select-option__item-text"*!/*/}
                {/*        /!*      style={{ opacity: 0.3 }}*!/*/}
                {/*        /!*    >*!/*/}
                {/*        /!*      논조 수정*!/*/}
                {/*        /!*    </span>*!/*/}
                {/*        /!*  </button>*!/*/}
                {/*        /!*</li>*!/*/}
                {/*      </ul>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <Button
                  label={'보고서 만들기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={newsLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 &&
                    setInitMonitoringReportPopup(
                      true,
                      searchContentKeyList,
                      mediaValuePointList,
                      toneList,
                      monitoringCategoryData?.title || ''
                    )
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
                      monitoringCategoryData &&
                      handleChangeSort(
                        dataItem,
                        orderItem,
                        monitoringListParams,
                        monitoringParams,
                        monitoringDate,
                        monitoringCategoryData,
                        isOwner,
                        isFilterSubParam
                      )
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
