import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SortFilterList from '~/components/common/ui/SortFilterList'
import {
  defaultSortOptionsByData,
  disclosureScopeFilterOptionList,
} from '~/components/contents/monitoring/Management/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { useMonitoringManagement } from '~/utils/hooks/contents/monitoring/useManagement'

const Header = () => {
  const router = useRouter()
  const {
    sortByOwner,
    licenseInfo,
    pageCount,
    managementListParams,
    handleIsSendToMe,
    managementContentListButton,
    setManagementContentListButtonAction,
    handleChangeSort,
    handleChangeShareCode,
  } = useMonitoringManagement()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const [isOption, setIsOption] = useState(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  const handleShareCode = (e: SelectListOptionItem) => {
    setIsOption(() => false)
    handleChangeShareCode(e, managementListParams)
  }

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div className="mb-contents-layout__header">
      <div className="search-result__header">
        <div className="search-result-type2__header">
          <h2 className="s-header__title">{managementListParams?.category?.name}</h2>
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
                    handleIsSendToMe(e.target.checked, managementListParams)
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
                              'is-selected': managementListParams.shareCode.id === e.id,
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
                onClick={() => setManagementContentListButtonAction(!managementContentListButton)}
              />
              {managementListParams.sort && managementListParams.sort.length > 0 && (
                <SortFilterList
                  sortOptionsByData={defaultSortOptionsByData}
                  onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                    handleChangeSort([`${dataItem.id}!${orderItem.id}`], managementListParams)
                  }
                  value={managementListParams.sort as string[]}
                  disabled={pageCount.totalCount === undefined || pageCount.totalCount === 0}
                />
              )}
            </li>
            <li className="button">
              <Button
                label={'맞춤검색 만들기'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                onClick={() => router.push('/news/search')}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
