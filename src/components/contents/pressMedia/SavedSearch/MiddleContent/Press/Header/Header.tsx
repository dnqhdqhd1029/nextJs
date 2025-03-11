import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import DropDownButton from '~/components/contents/common/dropdownButton/DropdownButton'
import {
  maxPressSortOptionsByData,
  minPressSortOptionsByData,
  pressSortOptionsByData,
} from '~/components/contents/pressMedia/SavedSearch/defaultData'
import SearchOption from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Press/Header/SearchOption'
import { SelectListOptionItem } from '~/types/common'
import { ESearchJournalistDocumentDto, ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressHeader = () => {
  const {
    journalIdKey,
    journalLoading,
    savedJournalKey,
    isFilterSubParam,
    pressParamsExpandButton,
    journalApiList,
    pressParamKeywordButton,
    userPressListAutoSaveData,
    pressListParams,
    searchActivate,
    isOwner,
    pageCount,
    savedJournalList,
    journalIdKeyParam,
    pressDto,
    searchContentKeyList,
    setPressAllSearchContentKeyList,
    setIsPressFilterSubParamAction,
    savedJournalAuth,
    setOpenSearchRegisterPopup,
    setPressParamKeywordButtonAction,
    openPressEditPage,
    checkAutoRegisterSelectedPressRegist,
    handlePressChangeSort,
    pressRegisterEditAction,
    pressFilterOptionAction,
  } = useSavedSearch()
  const [isSelectedNm, setIsSelectedNm] = useState('')
  const [isSelected, setIsSelected] = useState(false)

  const checkActiveId = async () => {
    let checkStatus = false
    let count = 0
    if (searchContentKeyList.length > 0) {
      if (searchContentKeyList.length === pageCount.totalCount) {
        checkStatus = true
      } else {
        if (journalApiList.length > 0) {
          for await (const eElement of journalApiList) {
            const temp = searchContentKeyList as ESearchJournalistDocumentDto[]
            const find = temp.find(e => e?.jrnlst_id === eElement?.jrnlst_id)
            if (find) {
              count += 1
            }
          }
          if (journalApiList.length === count) {
            checkStatus = true
          }
        }
      }
    }
    setIsSelected(() => checkStatus)
  }

  const checkedAll = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(() => e.target.checked)
    setPressAllSearchContentKeyList(e.target.checked, journalApiList, searchContentKeyList)
  }

  useEffect(() => {
    if (savedJournalKey < 1) return
    const find = savedJournalList.find(e => e.jrnlstSrchId === savedJournalKey)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedNm(() => find.title)
    }
  }, [savedJournalKey])

  useEffect(() => {
    checkActiveId()
  }, [searchContentKeyList, journalApiList])

  return (
    <div className="mb-contents-layout__header">
      <div className="search-result__header">
        <ul className="interval-mt10">
          <li>
            <div className="search-result__header-title">
              <h2 className="font-heading--h6">{isSelectedNm}</h2>
              {savedJournalAuth && (
                <Button
                  label={'검색 수정'}
                  cate={'link-text-arrow'}
                  size={'m'}
                  color={'secondary'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.chevronLeft}
                  onClick={() => openPressEditPage(true, pressListParams)}
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
                    icoLeftData={icoSvgData.funnel}
                    disabled={journalLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                    onClick={() =>
                      setIsPressFilterSubParamAction(savedJournalKey, journalIdKey, pressDto, pressListParams, isOwner)
                    }
                  />
                )}
                {savedJournalAuth && (
                  <Fragment>
                    {!searchActivate ? (
                      <Button
                        label={'검색 조건 저장'}
                        cate={'default'}
                        size={'s'}
                        color={'tertiary'}
                        onClick={() =>
                          pressRegisterEditAction(pressDto, savedJournalKey, pressListParams, isOwner, isFilterSubParam)
                        }
                      />
                    ) : (
                      <DropDownButton
                        mainText={'검색 조건 저장'}
                        classNameTopLayerRef={'select__section select-type1-small select-type1-tertiary'}
                        icoSvgData={'chevronDown'}
                        topLayerList={[
                          { id: 'edit', name: '검색 조건 수정' },
                          { id: 'new', name: '새 맞춤 검색 만들기' },
                        ]}
                        topLayerStyle={{ paddingLeft: 5 }}
                        listLayerStyle={{ right: 0, left: 'unset' }}
                        topLayerListAction={e =>
                          e.id === 'edit'
                            ? pressRegisterEditAction(
                                pressDto,
                                savedJournalKey,
                                pressListParams,
                                isOwner,
                                isFilterSubParam
                              )
                            : setOpenSearchRegisterPopup('press')
                        }
                      />
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </li>
          {journalLoading ? (
            <li>
              <div
                className={'search-result__header-tags mt-12 display-flex'}
                style={{ height: 42 }}
              >
                <div className="header-tags__group" />
                <div className="header-tags__button">
                  <button type="button">
                    <IcoSvg data={!pressParamsExpandButton ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
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
                checked={isSelected}
                disabled={journalLoading}
                onChange={e => checkedAll(e)}
              />
              <div className="header-sort__action">
                <Button
                  label={'리스트에 추가'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={journalLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    journalIdKeyParam &&
                    checkAutoRegisterSelectedPressRegist(
                      true,
                      searchContentKeyList,
                      userPressListAutoSaveData,
                      journalApiList,
                      journalIdKeyParam,
                      pressDto
                    )
                  }
                />
                <Button
                  label={'이메일 보내기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={journalLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 && pressFilterOptionAction('email', searchContentKeyList)
                  }
                />
                <Button
                  label={'보도자료 배포'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={journalLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 && pressFilterOptionAction('release', searchContentKeyList)
                  }
                />
                <Button
                  label={'활동 추가'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={journalLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 && pressFilterOptionAction('activity', searchContentKeyList)
                  }
                />
              </div>
              <div className="header-sort__filter">
                {!pressParamKeywordButton && (
                  <Button
                    label={'검색'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.search}
                    icoSize={18}
                    onClick={() => setPressParamKeywordButtonAction(!pressParamKeywordButton)}
                  />
                )}
                {pressDto.sort && pressDto.sort.length > 0 && (
                  <SortFilterList
                    sortOptionsByData={
                      pressListParams.keywordParam.newsKeywordValue &&
                      pressListParams.keywordParam.newsKeywordValue !== ''
                        ? maxPressSortOptionsByData
                        : pressListParams.keywordParam.keyword && pressListParams.keywordParam.keyword.length > 0
                        ? pressSortOptionsByData
                        : minPressSortOptionsByData
                    }
                    onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem, sortValue: string) =>
                      handlePressChangeSort(
                        dataItem,
                        orderItem,
                        sortValue,
                        pressDto,
                        pressListParams,
                        savedJournalKey,
                        isOwner,
                        isFilterSubParam
                      )
                    }
                    value={pressDto.sort as string[]}
                    disabled={journalLoading}
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

export default PressHeader
