import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import PressSearchFilterItem from '~/components/contents/pressMedia/SearchResult/Press/LeftContent/PressSearchFilterItem'
import PressSearchFilterItemSubMenu from '~/components/contents/pressMedia/SearchResult/Press/LeftContent/PressSearchFilterItemSubMenu'
import PressSearchFilterSelectItem from '~/components/contents/pressMedia/SearchResult/Press/LeftContent/PressSearchFilterSelectItem'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const PressSearchFilter = () => {
  const {
    pressDto,
    pressListParams,
    filterJournalSubParam,
    filterJournalSubParamActions,
    setInitPressFilterSubParamActions,
  } = usePressMediaSearchResult()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (filterJournalSubParamActions.length > 0) {
      const isData = filterJournalSubParamActions.find(e => e.values.length > 0)
      setIsActive(() => !!isData)
    } else {
      setIsActive(() => false)
    }
  }, [filterJournalSubParamActions])

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
              onClick={() => setInitPressFilterSubParamActions(pressDto, pressListParams)}
            />
          )}
        </div>
      </div>
      <div className="lnb-filter__menu">
        <ul className="lnb-filter__menu-list">
          {filterJournalSubParam &&
            filterJournalSubParam.map(e => {
              if (e.id === 'filterInformation') {
                return (
                  <PressSearchFilterSelectItem
                    key={'PressSearchFilterSelectItem' + e.id + e.title}
                    {...e}
                  />
                )
              } else if (e.id === 'filterCategory' || e.id === 'filterLocation' || e.id === 'filterType') {
                return (
                  <PressSearchFilterItemSubMenu
                    key={'SearchFilterItemTextline' + e.id + e.title}
                    {...e}
                  />
                )
              } else {
                return (
                  <PressSearchFilterItem
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

export default PressSearchFilter
