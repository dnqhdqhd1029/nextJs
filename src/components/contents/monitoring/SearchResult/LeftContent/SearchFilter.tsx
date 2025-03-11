import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import Loader from '~/components/common/ui/Loader'
import SearchFilterItem from '~/components/contents/monitoring//SearchResult/LeftContent/SearchFilterItem'
import { subNewsFilterOptionsList } from '~/components/contents/monitoring/SearchResult/defaultData'
import SearchFilterItemDate from '~/components/contents/monitoring/SearchResult/LeftContent/SearchFilterItemDate'
import SearchFilterItemSubMenu from '~/components/contents/monitoring/SearchResult/LeftContent/SearchFilterItemSubMenu'
import SearchFilterSelectItem from '~/components/contents/monitoring/SearchResult/LeftContent/SearchFilterSelectItem'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const SearchFilter = () => {
  const {
    filterSubParam,
    filterSubParamActions,
    monitoringListParams,
    monitoringParams,
    setInitFilterSubParamActions,
  } = useMonitoringSearchResult()
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
    <div className={cn('lnb-filter__section')}>
      <div className={cn('lnb-filter__header', { 'top-0': true })}>
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
                setInitFilterSubParamActions(subNewsFilterOptionsList, monitoringListParams, monitoringParams)
              }
            />
          )}
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
              } else if (e.id === 'filterPeriod') {
                return (
                  <SearchFilterItemDate
                    key={'SearchFilterItemTextline' + e.id + e.title}
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
