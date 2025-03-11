import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { mediaSortOptionsByData } from '~/components/contents/pressMedia/List/Result/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const MediaHeader = () => {
  const {
    mediaIdKey,
    arrayMediaAuth,
    mediaLoading,
    mediaArrayId,
    isOwner,
    mediaIdKeyParam,
    isFilterSubParam,
    userMediaListAutoSaveData,
    mediaApiList,
    mediaParamKeywordButton,
    arrayMediaList,
    pageCount,
    mediaDto,
    searchContentKeyList,
    setMediaAllSearchContentKeyList,
    setIsMediaFilterSubParamAction,
    setMediaParamKeywordButtonAction,
    checkAutoRegisterSelectedMediaRegist,
    mediaFilterOptionAction,
    handleMediaChangeSort,
  } = usePressMediaListResult()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const [isSelectedNm, setIsSelectedNm] = useState('')
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
    if (mediaArrayId < 1) return
    const find = arrayMediaList.find(e => e.mediaListId === mediaArrayId)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedNm(() => find.title)
    }
  }, [mediaArrayId])

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
              <h2 className="font-heading--h6">{isSelectedNm}</h2>
              <div className="search-result__header-buttons">
                {!isFilterSubParam && (
                  <Button
                    label={'필터'}
                    cate={'default-ico-text'}
                    size={'s'}
                    color={'tertiary'}
                    icoLeft={true}
                    disabled={mediaLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                    icoLeftData={icoSvgData.funnel}
                    onClick={() => setIsMediaFilterSubParamAction(mediaArrayId, mediaIdKey, mediaDto, isOwner)}
                  />
                )}
              </div>
            </div>
          </li>
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
                    mediaIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    mediaFilterOptionAction(
                      'email',
                      searchContentKeyList,
                      mediaDto,
                      mediaArrayId,
                      isOwner,
                      isFilterSubParam,
                      mediaApiList,
                      mediaIdKeyParam
                    )
                  }
                />
                <Button
                  label={'보도자료 배포'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={mediaLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    mediaIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    mediaFilterOptionAction(
                      'release',
                      searchContentKeyList,
                      mediaDto,
                      mediaArrayId,
                      isOwner,
                      isFilterSubParam,
                      mediaApiList,
                      mediaIdKeyParam
                    )
                  }
                />
                <Button
                  label={'활동 추가'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={mediaLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    mediaIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    mediaFilterOptionAction(
                      'activity',
                      searchContentKeyList,
                      mediaDto,
                      mediaArrayId,
                      isOwner,
                      isFilterSubParam,
                      mediaApiList,
                      mediaIdKeyParam
                    )
                  }
                />
                <Button
                  label={'삭제하기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={arrayMediaAuth ? mediaLoading || searchContentKeyList.length < 1 : true}
                  onClick={() =>
                    mediaIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    mediaFilterOptionAction(
                      'delete',
                      searchContentKeyList,
                      mediaDto,
                      mediaArrayId,
                      isOwner,
                      isFilterSubParam,
                      mediaApiList,
                      mediaIdKeyParam
                    )
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
                {mediaDto && mediaDto.sort && mediaDto.sort.length > 0 && (
                  <SortFilterList
                    sortOptionsByData={mediaSortOptionsByData}
                    onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem, sortValue: string) =>
                      handleMediaChangeSort(
                        dataItem,
                        orderItem,
                        sortValue,
                        mediaDto,
                        mediaArrayId,
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
