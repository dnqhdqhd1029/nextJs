import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import MediaSearchFilterItem from '~/components/contents/pressMedia/SearchResult/Media/LeftContent/MediaSearchFilterItem'
import MediaSearchFilterItemSubMenu from '~/components/contents/pressMedia/SearchResult/Media/LeftContent/MediaSearchFilterItemSubMenu'
import MediaSearchFilterSelectItem from '~/components/contents/pressMedia/SearchResult/Media/LeftContent/MediaSearchFilterSelectItem'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const MediaSearchFilter = () => {
  const {
    mediaDto,
    mediaListParams,
    filterMediaSubParam,
    filterMediaSubParamActions,
    setInitMediaFilterSubParamActions,
  } = usePressMediaSearchResult()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (filterMediaSubParamActions.length > 0) {
      const isData = filterMediaSubParamActions.find(e => e.values.length > 0)
      setIsActive(() => !!isData)
    } else {
      setIsActive(() => false)
    }
  }, [filterMediaSubParamActions])

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
              onClick={() => setInitMediaFilterSubParamActions(mediaDto, mediaListParams)}
            />
          )}
        </div>
      </div>
      <div className="lnb-filter__menu">
        <ul className="lnb-filter__menu-list">
          {filterMediaSubParam &&
            filterMediaSubParam.map(e => {
              if (e.id === 'filterInformation') {
                return (
                  <MediaSearchFilterSelectItem
                    key={'MediaSearchFilterSelectItem' + e.id + e.title}
                    {...e}
                  />
                )
              } else if (e.id === 'filterCategory' || e.id === 'filterLocation' || e.id === 'filterType') {
                return (
                  <MediaSearchFilterItemSubMenu
                    key={'SearchFilterItemTextline' + e.id + e.title}
                    {...e}
                  />
                )
              } else {
                return (
                  <MediaSearchFilterItem
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

export default MediaSearchFilter
