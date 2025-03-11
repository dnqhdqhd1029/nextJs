import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { activityNaviLinks, defaultSortOptionsByData } from '~/components/contents/activity/common/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const SearchHeader = () => {
  const {
    apiParams,
    activityList,
    activityParamKeywordButton,
    searchContentLoading,
    pageCount,
    searchContentKeyList,
    isTagButton,
    setActivityParamKeywordButtonActions,
    setAllSearchContentKeyList,
    setSelectedExcelFileData,
    tagEdit,
    handleChangeSort,
    handleActivityChangeSort,
    activityAction,
  } = useActivityList()
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
        if (activityList.length > 0) {
          for await (const eElement of activityList) {
            const find = searchContentKeyList.find(e => e?.actionId === eElement?.actionId)
            if (find) {
              count += 1
            }
          }
          if (activityList.length === count) {
            checkStatus = true
          }
        }
      }
    }
    setIsSelected(() => checkStatus)
  }

  const checkedAll = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(() => e.target.checked)
    setAllSearchContentKeyList(e.target.checked, activityList, searchContentKeyList)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    checkActiveId()
  }, [searchContentKeyList, activityList])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div className="mb-contents-layout__header">
      <div className="search-result__header">
        <ul className="interval-mt10">
          <li>
            <div className="search-result-type2__header">
              <h2 className="s-header__title fw700">활동</h2>
              <ul className="s-header__control">
                <li className="button">
                  <div
                    // className="select__section select-type1-small select-line select-align-right"
                    className={cn('select__section select-type1-small select-type1-tertiary select-align-right', {
                      'is-show': isOption,
                    })}
                    ref={shareIdOpenRef}
                  >
                    <button
                      className="select__label"
                      onClick={() => {
                        setIsOption(() => !isOption)
                      }}
                    >
                      <span className="select__label-text">활동 추가</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                    <div
                      className="select-option__section"
                      style={{ display: isOption ? 'block' : 'none' }}
                    >
                      <div className="select-option__area">
                        <ul className="select-option__group">
                          {activityNaviLinks.map((e, index) => (
                            <li key={'activityNaviLinks' + index}>
                              <button
                                className="select-option__item"
                                onClick={() => activityAction(e)}
                              >
                                <span className="select-option__item-text">{e.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="search-result__header-sort type-pl-14">
              <FormInputBtn
                type="checkbox"
                name={'search-result__header-sort'}
                id={'search-result__header-sort'}
                label={
                  searchContentKeyList.length === pageCount.totalCount
                    ? `총 ${getCurrencyFormat(pageCount.totalCount)}개`
                    : searchContentKeyList.length > 0
                    ? `${getCurrencyFormat(searchContentKeyList.length)}개 / 총 ${getCurrencyFormat(
                        pageCount.totalCount
                      )}개`
                    : `총 ${getCurrencyFormat(pageCount.totalCount)}개`
                }
                disabled={(activityList && activityList.length < 1) || searchContentLoading}
                checked={isSelected}
                onChange={e => activityList.length > 0 && checkedAll(e)}
              />
              <div className="header-sort__action">
                <Fragment>
                  <Button
                    label={'태그 입력'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-text'}
                    onClick={() => searchContentKeyList.length > 0 && tagEdit(searchContentKeyList)}
                    disabled={searchContentLoading || searchContentKeyList.length < 1}
                  />
                  <Button
                    label={'내보내기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-text'}
                    onClick={() => searchContentKeyList.length > 0 && setSelectedExcelFileData(0, '', true)}
                    disabled={searchContentLoading || searchContentKeyList.length < 1}
                  />
                </Fragment>
              </div>
              <div className="header-sort__filter">
                <ul className="s-header__control">
                  <li className="filter">
                    {!activityParamKeywordButton && (
                      <Button
                        label={'검색'}
                        cate={'ico-only'}
                        size={'s'}
                        color={'body-text'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.search}
                        icoSize={18}
                        onClick={() => setActivityParamKeywordButtonActions(!activityParamKeywordButton)}
                      />
                    )}
                    {apiParams.sort && apiParams.sort.length > 0 && (
                      <SortFilterList
                        sortOptionsByData={defaultSortOptionsByData}
                        onChange={(
                          dataItem: SelectListOptionItem,
                          orderItem: SelectListOptionItem,
                          sortValue: string
                        ) => handleActivityChangeSort(dataItem, orderItem, sortValue)}
                        value={apiParams.sort as string[]}
                        disabled={pageCount.totalCount === undefined || pageCount.totalCount === 0}
                      />
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SearchHeader
