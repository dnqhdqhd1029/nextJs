import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import {
  maxMediaSortOptionsByData,
  mediaSortOptionsByData,
} from '~/components/contents/pressMedia/SearchResult/defaultData'
import SearchOption from '~/components/contents/pressMedia/SearchResult/Media/MiddleContent/Header/SearchOption'
import { SelectListOptionItem } from '~/types/common'
import { ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const Header = () => {
  const {
    mediaLoading,
    isTagButton,
    mediaListParams,
    mediaParamKeywordButton,
    userMediaListAutoSaveData,
    pageCount,
    mediaDto,
    mediaIdKeyParam,
    mediaParamsExpandButton,
    mediaApiList,
    searchContentKeyList,
    setMediaAllSearchContentKeyList,
    setMediaParamKeywordButtonAction,
    setOpenSearchRegisterPopup,
    setSelectedExcelFileData,
    checkAutoRegisterSelectedMediaRegist,
    handleMediaChangeSort,
    moveToMediaResearch,
    mediaFilterOptionAction,
  } = usePressMediaSearchResult()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)

  const [isSelected, setIsSelected] = useState(false)
  const [isOption, setIsOption] = useState(false)

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

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    checkActiveId()
  }, [searchContentKeyList, mediaApiList])

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
              <h2 className="font-heading--h6">매체 검색</h2>
              <Button
                label={'검색 수정'}
                cate={'link-text-arrow'}
                size={'m'}
                color={'secondary'}
                icoLeft={true}
                icoLeftData={icoSvgData.chevronLeft}
                onClick={() => moveToMediaResearch(mediaListParams)}
              />
              <div className="search-result__header-buttons">
                <Button
                  label={'검색 조건 저장'}
                  cate={'default'}
                  size={'s'}
                  color={'tertiary'}
                  onClick={() => setOpenSearchRegisterPopup('media')}
                />
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
                <Button
                  label={'내보내기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={mediaLoading || searchContentKeyList.length < 1}
                  onClick={() => searchContentKeyList.length > 0 && setSelectedExcelFileData(0, '미디어', true)}
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
                      handleMediaChangeSort(dataItem, orderItem, sortValue, mediaDto, mediaListParams)
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

export default Header
