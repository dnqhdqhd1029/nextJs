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
  maxMediaSortOptionsByData,
  mediaSortOptionsByData,
} from '~/components/contents/pressMedia/SavedSearch/defaultData'
import SearchOption from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Media/Header/SearchOption'
import { SelectListOptionItem } from '~/types/common'
import { ESearchJournalistDocumentDto, ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaHeader = () => {
  const {
    mediaIdKey,
    mediaLoading,
    savedMediaKey,
    isFilterSubParam,
    userMediaListAutoSaveData,
    mediaParamsExpandButton,
    mediaApiList,
    mediaParamKeywordButton,
    mediaIdKeyParam,
    savedMediaList,
    mediaListParams,
    searchActivate,
    isOwner,
    pageCount,
    mediaDto,
    searchContentKeyList,
    setMediaAllSearchContentKeyList,
    setIsMediaFilterSubParamAction,
    savedMediaAuth,
    setOpenSearchRegisterPopup,
    setMediaParamKeywordButtonAction,
    openMediaEditPage,
    checkAutoRegisterSelectedMediaRegist,
    mediaRegisterEditAction,
    mediaFilterOptionAction,
    handleMediaChangeSort,
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
        if (mediaApiList.length > 0) {
          for await (const eElement of mediaApiList) {
            const temp = searchContentKeyList as ESearchMediaDocumentDto[]
            const find = temp.find(e => e?.mid === eElement?.mid)
            if (find) {
              count += 1
            }
          }
          if (mediaApiList.length === count) {
            checkStatus = true
          }
        }
      }
    }
    setIsSelected(() => checkStatus)
  }

  const checkedAll = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(() => e.target.checked)
    setMediaAllSearchContentKeyList(e.target.checked, mediaApiList, searchContentKeyList)
  }

  useEffect(() => {
    if (savedMediaKey < 1) return
    const find = savedMediaList.find(e => e.mediaSrchId === savedMediaKey)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedNm(() => find.title)
    }
  }, [savedMediaKey])

  useEffect(() => {
    checkActiveId()
  }, [searchContentKeyList, mediaApiList])

  return (
    <div className="mb-contents-layout__header">
      <div className="search-result__header">
        <ul className="interval-mt10">
          <li>
            <div className="search-result__header-title">
              <h2 className="font-heading--h6">{isSelectedNm}</h2>
              {savedMediaAuth && (
                <Button
                  label={'검색 수정'}
                  cate={'link-text-arrow'}
                  size={'m'}
                  color={'secondary'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.chevronLeft}
                  onClick={() => openMediaEditPage(true, mediaListParams)}
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
                    disabled={mediaLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                    onClick={() =>
                      setIsMediaFilterSubParamAction(savedMediaKey, mediaIdKey, mediaDto, mediaListParams, isOwner)
                    }
                  />
                )}

                {savedMediaAuth && (
                  <Fragment>
                    {!searchActivate ? (
                      <Button
                        label={'검색 조건 저장'}
                        cate={'default'}
                        size={'s'}
                        color={'tertiary'}
                        onClick={() =>
                          mediaRegisterEditAction(mediaDto, savedMediaKey, mediaListParams, isOwner, isFilterSubParam)
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
                            ? mediaRegisterEditAction(
                                mediaDto,
                                savedMediaKey,
                                mediaListParams,
                                isOwner,
                                isFilterSubParam
                              )
                            : setOpenSearchRegisterPopup('media')
                        }
                      />
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </li>
          {mediaLoading ? (
            <li>
              <div
                className={'search-result__header-tags mt-12 display-flex'}
                style={{ height: 42 }}
              >
                <div className="header-tags__group" />
                <div className="header-tags__button">
                  <button type="button">
                    <IcoSvg data={!mediaParamsExpandButton ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
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
                disabled={(mediaApiList && mediaApiList.length < 1) || mediaLoading}
                checked={isSelected}
                onChange={e => mediaApiList.length > 0 && checkedAll(e)}
              />
              <div className="header-sort__action">
                <Button
                  label={'리스트에 추가'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={mediaLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    mediaIdKeyParam &&
                    checkAutoRegisterSelectedMediaRegist(
                      true,
                      searchContentKeyList,
                      userMediaListAutoSaveData,
                      mediaApiList,
                      mediaIdKeyParam,
                      mediaDto
                    )
                  }
                />
                <Button
                  label={'이메일 보내기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={mediaLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 && mediaFilterOptionAction('email', searchContentKeyList)
                  }
                />
                <Button
                  label={'보도자료 배포'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={mediaLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 && mediaFilterOptionAction('release', searchContentKeyList)
                  }
                />
                <Button
                  label={'활동 추가'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={mediaLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    searchContentKeyList.length > 0 && mediaFilterOptionAction('activity', searchContentKeyList)
                  }
                />
              </div>
              <div className="header-sort__filter">
                {!mediaParamKeywordButton && (
                  <Button
                    label={'검색'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.search}
                    icoSize={18}
                    onClick={() => setMediaParamKeywordButtonAction(!mediaParamKeywordButton)}
                  />
                )}
                {mediaDto.sort && mediaDto.sort.length > 0 && (
                  <SortFilterList
                    sortOptionsByData={
                      mediaListParams.keywordParam.keyword && mediaListParams.keywordParam.keyword.length > 0
                        ? maxMediaSortOptionsByData
                        : mediaSortOptionsByData
                    }
                    onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem, sortValue: string) =>
                      handleMediaChangeSort(
                        dataItem,
                        orderItem,
                        sortValue,
                        mediaDto,
                        mediaListParams,
                        savedMediaKey,
                        isOwner,
                        isFilterSubParam
                      )
                    }
                    value={mediaDto.sort as string[]}
                    disabled={mediaLoading}
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

export default MediaHeader
