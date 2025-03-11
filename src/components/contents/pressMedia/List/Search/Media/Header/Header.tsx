import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import SortFilterList from '~/components/common/ui/SortFilterList'
import {
  defaultSortOptionsByData,
  disclosureScopeFilterOptionList,
} from '~/components/contents/pressMedia/List/Search/defaultData'
import { pressContentListProps } from '~/stores/modules/contents/pressMedia/pressListManagement'
import { SelectListOptionItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const MediaHeader = () => {
  const {
    categoryData,
    sortByOwner,
    pageCount,
    handleIsSendToMe,
    optionButton,
    mediaContentList,
    isSelectedAllActionId,
    licenseInfo,
    mediaListParams,
    searchContentKeyList,
    mediaContentListButton,
    setManagementContentListButtonAction,
    handleChangeSort,
    handleChangeShareCode,
    setMediaGroupPopupAction,
    setAllSearchContentKeyList,
    filterOptionAction,
  } = useMediaListManagement()
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
        if (mediaContentList.length > 0) {
          for await (const eElement of mediaContentList) {
            const find = searchContentKeyList.find(e => e?.mediaListId === eElement?.mediaListId)
            if (find) {
              count += 1
            }
          }
          if (mediaContentList.length === count) {
            checkStatus = true
          }
        }
      }
    }
    setIsSelected(() => checkStatus)
  }

  const checkedAll = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(() => e.target.checked)
    setAllSearchContentKeyList(e.target.checked, mediaContentList, searchContentKeyList)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  const handleShareCode = (e: SelectListOptionItem) => {
    setIsOption(() => false)
    handleChangeShareCode(e, mediaListParams)
  }

  useEffect(() => {
    checkActiveId()
  }, [mediaContentList])

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
              <h2 className="s-header__title">{categoryData.name}</h2>
              <ul className="s-header__control">
                <li className="button">
                  <div className="select__section select-type1-small select-line select-align-right">
                    <Button
                      label={'리스트 만들기'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                      onClick={() => setMediaGroupPopupAction()}
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
                onChange={e => mediaContentList.length > 0 && checkedAll(e)}
              />
              <div className="header-sort__action">
                <Button
                  label={'보도자료 배포'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={searchContentKeyList.length < 1}
                  onClick={() => searchContentKeyList.length > 0 && filterOptionAction('release', searchContentKeyList)}
                />
                <Button
                  label={'이메일 보내기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={searchContentKeyList.length < 1}
                  onClick={() => searchContentKeyList.length > 0 && filterOptionAction('email', searchContentKeyList)}
                />
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleIsSendToMe(e.target.checked)}
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
                                    'is-selected': mediaListParams.shareCode.id === e.id,
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
                      onClick={() => setManagementContentListButtonAction(!mediaContentListButton)}
                    />
                    {mediaListParams.sort && mediaListParams.sort.length > 0 && (
                      <SortFilterList
                        sortOptionsByData={defaultSortOptionsByData}
                        onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                          handleChangeSort([`${dataItem.id}!${orderItem.id}`], mediaListParams)
                        }
                        value={mediaListParams.sort as string[]}
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

export default MediaHeader
