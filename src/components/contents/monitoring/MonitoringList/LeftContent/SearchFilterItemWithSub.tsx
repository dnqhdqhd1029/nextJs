import { useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import SearchFilterItemSub from '~/components/contents/monitoring/MonitoringList/LeftContent/SearchFilterItemSub'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

interface Props {
  item: NavigationLinkItem
  keyValue: number
}
const SearchFilterItemWithSub = (props: Props) => {
  const {
    isFilterSubParam,
    isOwner,
    filterSubParamActions,
    monitoringListParams,
    monitoringParams,
    monitoringDate,
    monitoringCategoryData,
    searchActivate,
    setNewsAddAllExtraFilterSearch,
  } = useMonitoringSearch()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li id={props.item.id + 'lnb-filter__menu-list_subNewsFilterListListtype-submenu'}>
      {props.item.id && props.item.title && (
        <button
          type="button"
          className="lnb-filter-depth2__button is-opened"
          id={'lnb-filter__menu-depth1' + props.item.id}
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          <span className="lnb-filter__menu-txt">{props.item.title}</span>
          {props.item && props.item.subMenus && props.item.subMenus?.length > 0 ? (
            <span className="lnb-filter__menu-txt type-submenu">
              ({getCurrencyFormat(props.item.subMenus?.length)})
            </span>
          ) : (
            <span className="lnb-filter__menu-txt type-submenu">(0)</span>
          )}
          <span className="lnb-filter__menu-ico type-chevron">
            <IcoSvg data={isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </span>
        </button>
      )}
      {isOpen && (
        <motion.ul
          className={cn('lnb-filter-depth3__list overflow-hidden')}
          initial={{
            height: 0,
          }}
          animate={{
            height: isOpen ? 'auto' : 0,
          }}
          transition={filterTransition}
        >
          {props.item.subMenus &&
            props.item.subMenus.length > 0 &&
            props.item.subMenus.map(i => (
              <SearchFilterItemSub
                key={'filterSearchData' + i.id + i.title}
                item={i}
                keyValue={props.keyValue}
              />
            ))}
          {props.item.subMenus && props.item.subMenus.length >= 2 && (
            <li>
              <div className="lnb-filter-depth3__checkbox">
                <Button
                  label={'전체 선택'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={
                    !!(
                      filterSubParamActions[props.keyValue] &&
                      filterSubParamActions[props.keyValue].values.length > 0 &&
                      filterSubParamActions[props.keyValue].values.length >= props.item.subMenus.length
                    )
                  }
                  onClick={() =>
                    monitoringCategoryData &&
                    props.item.subMenus &&
                    props.item.subMenus.length > 0 &&
                    setNewsAddAllExtraFilterSearch(
                      props.item.subMenus,
                      filterSubParamActions,
                      props.keyValue,
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
              </div>
            </li>
          )}
        </motion.ul>
      )}
    </li>
  )
}

export default SearchFilterItemWithSub
