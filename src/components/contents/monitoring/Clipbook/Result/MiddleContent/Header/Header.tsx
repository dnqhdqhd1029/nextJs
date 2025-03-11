import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { defaultFilterOptionsByData } from '~/components/contents/monitoring/Clipbook/Result/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const Header = () => {
  const {
    arrayclipbookAuth,
    clipbookIdKey,
    clipbookDataCatgory,
    monitoringCategoryButton,
    newsLoading,
    isFilterSubParam,
    newsIdParams,
    pageCount,
    isOwner,
    newsList,
    setAllSearchContentKeyList,
    monitoringListParams,
    searchContentKeyList,
    openMonitoringAnalysisPopup,
    userClipbookListAutoSaveData,
    tagEdit,
    toneList,
    clipbookCategory,
    newsIdKey,
    setMonitoringCategoryButtonAction,
    setIsFilterSubParamAction,
    setInitMonitoringReportPopup,
    mediaValuePointList,
    setSelectedExcelFileData,
    checkAutoRegisterSelectedNewsClipbook,
    deleteClipbookNews,
    handleChangeSort,
  } = useClipbookDetail()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const updateButtonLayerRef = useRef<HTMLDivElement>(null)

  const [isSelectedNm, setIsSelectedNm] = useState('')
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
    if (clipbookIdKey < 1) return
    if (clipbookCategory && clipbookCategory.length > 0 && clipbookCategory[0].content.length > 0) {
      const find = clipbookCategory[0].content.find(e => e?.clipBookId === clipbookIdKey)
      if (find && find.title) {
        //@ts-ignore
        setIsSelectedNm(() => find.title)
      }
    }
    if (clipbookCategory && clipbookCategory.length > 0 && clipbookCategory[1].content.length > 0) {
      const find = clipbookCategory[1].content.find(e => e?.clipBookId === clipbookIdKey)
      if (find && find.title) {
        //@ts-ignore
        setIsSelectedNm(() => find.title)
      }
    }
  }, [clipbookIdKey])

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
              <h2 className="font-heading--h6">{isSelectedNm}</h2>
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
                    onClick={() => setIsFilterSubParamAction(clipbookIdKey, newsIdKey, monitoringListParams, isOwner)}
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
                    clipbookDataCatgory &&
                    openMonitoringAnalysisPopup(true, clipbookDataCatgory, clipbookIdKey)
                  }
                />
                <Button
                  label={'액셀 다운로드'}
                  cate={'default-ico-text'}
                  size={'s'}
                  color={'tertiary'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.excel}
                  disabled={newsLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                  onClick={() =>
                    pageCount.totalCount && pageCount.totalCount > 0 && setSelectedExcelFileData(0, '', true)
                  }
                />
                <Button
                  label={'보고서 만들기'}
                  cate={'default'}
                  size={'s'}
                  color={'tertiary'}
                  disabled={newsLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                  onClick={() =>
                    pageCount.totalCount &&
                    pageCount.totalCount > 0 &&
                    setInitMonitoringReportPopup(
                      monitoringListParams,
                      pageCount.totalCount,
                      true,
                      mediaValuePointList,
                      toneList,
                      clipbookDataCatgory?.title || ''
                    )
                  }
                />
              </div>
            </div>
          </li>
          <li>
            <div className="search-result__header-sort">
              <FormInputBtn
                type="checkbox"
                name={'clipbookNews_search-result__header-sort'}
                id={'clipbookNews_search-result__header-sort'}
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
                  disabled={arrayclipbookAuth ? searchContentKeyList.length < 1 : true}
                  onClick={() => searchContentKeyList.length > 0 && tagEdit(searchContentKeyList)}
                />
                {/*<div*/}
                {/*  className="select__section select-type1-small"*/}
                {/*  ref={updateButtonLayerRef}*/}
                {/*>*/}
                {/*  <button*/}
                {/*    className="select__label"*/}
                {/*    onClick={() => arrayclipbookAuth && setIsEdit(!isEdit)}*/}
                {/*    disabled={arrayclipbookAuth ? searchContentKeyList.length < 1 : true}*/}
                {/*  >*/}
                {/*    <span className="select__label-text">수정하기</span>*/}
                {/*    <IcoSvg data={icoSvgData.chevronDown} />*/}
                {/*  </button>*/}

                {/*  <div className={cn('select-option__section', { 'display-block': isEdit })}>*/}
                {/*    <div className="select-option__area">*/}
                {/*      <ul className="select-option__group">*/}
                {/*        <li>*/}
                {/*          <button*/}
                {/*            className="select-option__item"*/}
                {/*            onClick={() => searchContentKeyList.length > 0 && tagEdit(searchContentKeyList)}*/}
                {/*          >*/}
                {/*            <span className="select-option__item-text">태그 수정</span>*/}
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
                  label={'삭제하기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={arrayclipbookAuth ? newsLoading || searchContentKeyList.length < 1 : true}
                  onClick={() =>
                    newsIdParams &&
                    searchContentKeyList.length > 0 &&
                    deleteClipbookNews(
                      searchContentKeyList,
                      clipbookIdKey,
                      isOwner,
                      isFilterSubParam,
                      monitoringListParams,
                      newsList,
                      newsIdParams
                    )
                  }
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
                      clipbookDataCatgory &&
                      handleChangeSort(
                        dataItem,
                        orderItem,
                        monitoringListParams,
                        clipbookIdKey,
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
