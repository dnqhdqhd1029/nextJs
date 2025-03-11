import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import MediaSearchFilterItem from '~/components/contents/pressMedia/List/Result/LeftContent/Media/MediaSearchFilterItem'
import MediaSearchFilterItemSubMenu from '~/components/contents/pressMedia/List/Result/LeftContent/Media/MediaSearchFilterItemSubMenu'
import MediaSearchFilterSelectItem from '~/components/contents/pressMedia/List/Result/LeftContent/Media/MediaSearchFilterSelectItem'
import PressSearchFilterItem from '~/components/contents/pressMedia/List/Result/LeftContent/Press/PressSearchFilterItem'
import PressSearchFilterItemSubMenu from '~/components/contents/pressMedia/List/Result/LeftContent/Press/PressSearchFilterItemSubMenu'
import PressSearchFilterSelectItem from '~/components/contents/pressMedia/List/Result/LeftContent/Press/PressSearchFilterSelectItem'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const SearchFilter = () => {
  const {
    listDefine,
    pressDto,
    mediaDto,
    journalArrayId,
    mediaArrayId,
    isOwner,
    isFilterSubParam,
    filterJournalSubParamActions,
    filterMediaSubParamActions,
    filterJournalSubParam,
    filterMediaSubParam,
    setInitPressFilterSubParamActionsAction,
    setInitMediaFilterSubParamActionsAction,
    setIsClosePressFilterSubParamAction,
    setIsCloseMediaFilterSubParamAction,
  } = usePressMediaListResult()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (listDefine === 'press') {
      if (filterJournalSubParamActions.length > 0) {
        const isData = filterJournalSubParamActions.find(e => e.values.length > 0)
        setIsActive(() => !!isData)
      } else {
        setIsActive(() => false)
      }
    }
  }, [filterJournalSubParamActions])

  useEffect(() => {
    if (listDefine !== 'press') {
      if (filterMediaSubParamActions.length > 0) {
        const isData = filterMediaSubParamActions.find(e => e.values.length > 0)
        setIsActive(() => !!isData)
      } else {
        setIsActive(() => false)
      }
    }
  }, [filterMediaSubParamActions])

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
                listDefine === 'press'
                  ? setInitPressFilterSubParamActionsAction(pressDto, journalArrayId, isOwner, isFilterSubParam)
                  : setInitMediaFilterSubParamActionsAction(mediaDto, mediaArrayId, isOwner, isFilterSubParam)
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
              listDefine === 'press'
                ? setIsClosePressFilterSubParamAction(journalArrayId, pressDto, isOwner)
                : setIsCloseMediaFilterSubParamAction(mediaArrayId, mediaDto, isOwner)
            }
          />
        </div>
      </div>
      <div className="lnb-filter__menu">
        {listDefine === 'press' ? (
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
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default SearchFilter
