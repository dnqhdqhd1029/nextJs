import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { subNewsFilterOptionsList } from '~/components/contents/monitoring/MonitoringList/defaultData'
import SearchFilterItem from '~/components/contents/monitoring/MonitoringList/LeftContent/SearchFilterItem'
import SearchFilterItemSubMenu from '~/components/contents/monitoring/MonitoringList/LeftContent/SearchFilterItemSubMenu'
import SearchFilterSelectItem from '~/components/contents/monitoring/MonitoringList/LeftContent/SearchFilterSelectItem'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const SearchFilter = () => {
  const {
    monitoringIdParams,
    isOwner,
    isFilterSubParam,
    filterSubParam,
    monitoringListParams,
    filterSubParamActions,
    monitoringParams,
    monitoringDate,
    monitoringCategoryData,
    searchActivate,
    setInitFilterSubParamActionsAction,
    setIsCloseFilterSubParamAction,
  } = useMonitoringSearch()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (filterSubParamActions.length > 0) {
      const isData = filterSubParamActions.find(e => e.values.length > 0)
      setIsActive(() => !!isData)
    } else {
      setIsActive(() => false)
    }
  }, [filterSubParamActions])

  return (
    <div
      className={cn('lnb-filter__section')}
      style={{
        position: isFilterSubParam ? 'relative' : 'absolute',
        left: isFilterSubParam ? '0' : '-99999999px',
        opacity: isFilterSubParam ? 1 : 0,
        transform: isFilterSubParam ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <div className={cn('lnb-filter__header', { 'top-0': isFilterSubParam })}>
        <div className="display-flex align-items__center">
          <h2 className="lnb-filter__header-title">필터</h2>
        </div>
        <div className="lnb-filter__header-buttons">
          {isActive && (
            <Button
              label={'초기화'}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              onClick={() =>
                monitoringCategoryData &&
                setInitFilterSubParamActionsAction(
                  subNewsFilterOptionsList,
                  monitoringListParams,
                  monitoringParams,
                  monitoringDate,
                  monitoringCategoryData,
                  searchActivate,
                  isOwner,
                  isFilterSubParam
                )
              }
            />
          )}
          <Button
            label={'닫기'}
            cate={'ico-only'}
            size={'s32'}
            color={'transparent'}
            icoLeft={true}
            icoLeftData={icoSvgData.iconCloseButton2}
            icoSize={16}
            onClick={() =>
              setIsCloseFilterSubParamAction(
                monitoringIdParams,
                monitoringListParams,
                monitoringParams,
                isOwner,
                monitoringDate
              )
            }
          />
        </div>
      </div>
      <div className="lnb-filter__menu">
        <ul className="lnb-filter__menu-list">
          {filterSubParam &&
            filterSubParam.map(e => {
              if (e.id === 'filterCategoryList') {
                return (
                  <SearchFilterItemSubMenu
                    key={'SearchFilterItemSubMenu' + e.id + e.title}
                    {...e}
                  />
                )
              } else if (e.id === 'filterInformation') {
                return (
                  <SearchFilterSelectItem
                    key={'SearchFilterInformation' + e.id + e.title}
                    {...e}
                  />
                )
              } else {
                return (
                  <SearchFilterItem
                    key={'SearchFilterItem' + e.id + e.title}
                    {...e}
                  />
                )
              }
            })}
        </ul>
      </div>
    </div>
  )
}

export default SearchFilter
