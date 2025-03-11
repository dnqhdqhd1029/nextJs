import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { pressSortOptionsByData } from '~/components/contents/pressMedia/List/Result/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { ESearchJournalistDocumentDto, ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const PressHeader = () => {
  const {
    journalIdKey,
    arrayJournalAuth,
    journalLoading,
    journalArrayId,
    isFilterSubParam,
    journalApiList,
    pressParamKeywordButton,
    userPressListAutoSaveData,
    pageCount,
    journalIdKeyParam,
    isOwner,
    arrayJournalList,
    pressDto,
    searchContentKeyList,
    setPressAllSearchContentKeyList,
    setIsPressFilterSubParamAction,
    setPressParamKeywordButtonAction,
    checkAutoRegisterSelectedPressRegist,
    handlePressChangeSort,
    pressFilterOptionAction,
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

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    if (journalArrayId < 1) return
    const find = arrayJournalList.find(e => e.jrnlstListId === journalArrayId)
    if (find && find.title) {
      //@ts-ignore
      setIsSelectedNm(() => find.title)
    }
  }, [journalArrayId])

  useEffect(() => {
    checkActiveId()
  }, [searchContentKeyList, journalApiList])

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
                    icoLeftData={icoSvgData.funnel}
                    disabled={journalLoading || !(pageCount.totalCount && pageCount.totalCount > 0)}
                    onClick={() => setIsPressFilterSubParamAction(journalArrayId, journalIdKey, pressDto, isOwner)}
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
                disabled={(journalApiList && journalApiList.length < 1) || journalLoading}
                checked={isSelected}
                onChange={e => journalApiList.length > 0 && checkedAll(e)}
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
                    journalIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    pressFilterOptionAction(
                      'email',
                      searchContentKeyList,
                      pressDto,
                      journalArrayId,
                      isOwner,
                      isFilterSubParam,
                      journalApiList,
                      journalIdKeyParam
                    )
                  }
                />
                <Button
                  label={'보도자료 배포'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={journalLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    journalIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    pressFilterOptionAction(
                      'release',
                      searchContentKeyList,
                      pressDto,
                      journalArrayId,
                      isOwner,
                      isFilterSubParam,
                      journalApiList,
                      journalIdKeyParam
                    )
                  }
                />
                <Button
                  label={'활동 추가'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={journalLoading || searchContentKeyList.length < 1}
                  onClick={() =>
                    journalIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    pressFilterOptionAction(
                      'activity',
                      searchContentKeyList,
                      pressDto,
                      journalArrayId,
                      isOwner,
                      isFilterSubParam,
                      journalApiList,
                      journalIdKeyParam
                    )
                  }
                />
                <Button
                  label={'삭제하기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={arrayJournalAuth ? journalLoading || searchContentKeyList.length < 1 : true}
                  onClick={() =>
                    journalIdKeyParam &&
                    searchContentKeyList.length > 0 &&
                    pressFilterOptionAction(
                      'delete',
                      searchContentKeyList,
                      pressDto,
                      journalArrayId,
                      isOwner,
                      isFilterSubParam,
                      journalApiList,
                      journalIdKeyParam
                    )
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
                    sortOptionsByData={pressSortOptionsByData}
                    onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem, sortValue: string) =>
                      handlePressChangeSort(
                        dataItem,
                        orderItem,
                        sortValue,
                        pressDto,
                        journalArrayId,
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
