import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SortFilterList from '~/components/common/ui/SortFilterList'
import {
  defaultSortOptionsByData,
  disclosureScopeFilterOptionList,
} from '~/components/contents/monitoring/Clipbook/Search/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const Header = () => {
  const {
    sortByOwner,
    licenseInfo,
    optionButton,
    clipbookContentList,
    searchContentKeyList,
    pageCount,
    clipbookListParams,
    handleIsSendToMe,
    clipbookContentListButton,
    setClipbookContentListButtonAction,
    handleChangeSort,
    handleChangeShareCode,
    setAllSearchContentKeyList,
    filterOptionAction,
    openClipbookPopup,
  } = useMonitoringClipbookSearch()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const [isOption, setIsOption] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const checkActiveId = async () => {
    let checkStatus = false
    let count = 0
    if (searchContentKeyList.length > 0) {
      if (searchContentKeyList.length === pageCount.totalCount) {
        checkStatus = true
      } else {
        if (clipbookContentList.length > 0) {
          for await (const eElement of clipbookContentList) {
            const find = searchContentKeyList.find(e => e?.clipBookId === eElement?.clipBookId)
            if (find) {
              count += 1
            }
          }
          if (clipbookContentList.length === count) {
            checkStatus = true
          }
        }
      }
    }
    setIsSelected(() => checkStatus)
  }

  const checkedAll = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(() => e.target.checked)
    setAllSearchContentKeyList(e.target.checked, clipbookContentList, searchContentKeyList)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  const handleShareCode = (e: SelectListOptionItem) => {
    setIsOption(() => false)
    handleChangeShareCode(e, clipbookListParams)
  }

  useEffect(() => {
    checkActiveId()
  }, [clipbookContentList])

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
              <h2 className="s-header__title">{clipbookListParams?.category?.name}</h2>
              <ul className="s-header__control">
                <li className="button">
                  <div className="select__section select-type1-small select-line select-align-right">
                    <Button
                      label={'클립북 만들기'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                      onClick={() => openClipbookPopup()}
                    />
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
                checked={isSelected}
                onChange={e => clipbookContentList.length > 0 && checkedAll(e)}
              />
              <div className="header-sort__action">
                <Button
                  label={'삭제하기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={searchContentKeyList.length > 0 ? !optionButton.isDelete : true}
                  onClick={() =>
                    searchContentKeyList.length > 0 &&
                    optionButton.isDelete &&
                    filterOptionAction('delete', searchContentKeyList)
                  }
                />
                <Button
                  label={'공유 설정 수정'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={searchContentKeyList.length > 0 ? !optionButton.isShared : true}
                  onClick={() =>
                    searchContentKeyList.length > 0 &&
                    optionButton.isShared &&
                    filterOptionAction('share', searchContentKeyList)
                  }
                />
              </div>
              <div className="header-sort__filter">
                <ul className="s-header__control">
                  <li className="toggle">
                    {licenseInfo.userLimit && licenseInfo.userLimit > 1 && (
                      <FormInputToggle
                        id="monitoring_management_toggle"
                        name="monitoring_management_toggle"
                        label="MY"
                        reverse={true}
                        checked={sortByOwner}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleIsSendToMe(e.target.checked, clipbookListParams)
                        }
                      />
                    )}
                  </li>
                  <li className="select">
                    <div
                      className="select__section select-type1-small"
                      ref={shareIdOpenRef}
                    >
                      <button
                        className="select__label"
                        onClick={() => setIsOption(!isOption)}
                      >
                        <span className="select__label-text">공유설정</span>
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </button>
                      <div className={cn('select-option__section', { 'display-block': isOption })}>
                        <div className="select-option__area">
                          <h6 className="select-option__group-title">공유설정</h6>
                          <ul className="select-option__group">
                            {disclosureScopeFilterOptionList.map(e => (
                              <li key={'defaultSelectLabel_monitoring_management' + e.id}>
                                <button
                                  className={cn('select-option__item', {
                                    'is-selected': clipbookListParams.shareCode.id === e.id,
                                  })}
                                  onClick={() => handleShareCode(e)}
                                >
                                  <span className="select-option__item-text">{e.name}</span>
                                  <span className="select-option__item-ico">
                                    <IcoSvg data={icoSvgData.checkThick} />
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="filter">
                    <Button
                      label={'검색'}
                      cate={'ico-only'}
                      size={'s'}
                      color={'body-text'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.search}
                      icoSize={18}
                      onClick={() => setClipbookContentListButtonAction(!clipbookContentListButton)}
                    />
                    {clipbookListParams.sort && clipbookListParams.sort.length > 0 && (
                      <SortFilterList
                        sortOptionsByData={defaultSortOptionsByData}
                        onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                          handleChangeSort([`${dataItem.id}!${orderItem.id}`], clipbookListParams)
                        }
                        value={clipbookListParams.sort as string[]}
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

export default Header
