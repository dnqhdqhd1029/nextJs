import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import CheckboxInputItem from '~/components/contents/activity/common/SearchNavigation/CheckboxInputItem'
import DateInputItem from '~/components/contents/activity/common/SearchNavigation/DateInputItem'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const SearchNavigation = () => {
  const { filterSubParamActions, apiParams, filterSubParam, setInitFilterSubParamActions } = useActivityList()
  const [isActive, setIsActive] = useState(false)

  const checkDate = () => {
    if (
      apiParams.periodEndDay &&
      apiParams.periodEndMonth &&
      apiParams.periodEndYear &&
      apiParams.periodStartDay &&
      apiParams.periodStartMonth &&
      apiParams.periodStartYear &&
      apiParams.periodEndDay !== '' &&
      apiParams.periodEndMonth !== '' &&
      apiParams.periodEndYear !== '' &&
      apiParams.periodStartDay !== '' &&
      apiParams.periodStartMonth !== '' &&
      apiParams.periodStartYear !== ''
    ) {
      setIsActive(() => true)
    } else {
      setIsActive(() => false)
    }
  }
  useEffect(() => {
    if (filterSubParamActions.length > 0) {
      const isData = filterSubParamActions.find(e => e.values.length > 0)
      if (isData) {
        setIsActive(() => true)
      } else {
        checkDate()
      }
    } else {
      checkDate()
    }
  }, [filterSubParamActions, apiParams])

  return (
    <div className="lnb-search__section">
      <div className="lnb-filter__section">
        <div className={cn('lnb-filter__header', { 'top-0': true })}>
          <div className="display-flex align-items__center">
            <h2 className="lnb-filter__header-title fw400">필터</h2>
          </div>
          <div className="lnb-filter__header-buttons">
            {isActive && (
              <Button
                label={'초기화'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() => setInitFilterSubParamActions(apiParams)}
              />
            )}
          </div>
        </div>
        <div className="lnb-filter__menu">
          <ul className="lnb-filter__menu-list">
            {filterSubParam &&
              filterSubParam.map((e, index) => {
                if (e.id === 'date') {
                  return (
                    <DateInputItem
                      key={'SearchFilterItemTextline' + e.id + e.title}
                      {...e}
                    />
                  )
                } else {
                  return (
                    <CheckboxInputItem
                      key={'SearchInputItem' + e.id}
                      {...e}
                    />
                  )
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchNavigation
