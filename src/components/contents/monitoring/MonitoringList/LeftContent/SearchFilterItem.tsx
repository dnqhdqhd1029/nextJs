import { Fragment, useEffect, useState } from 'react'
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

const SearchFilterItem = (props: NavigationLinkItem) => {
  const {
    isOwner,
    isFilterSubParam,
    filterSubParamActions,
    monitoringListParams,
    monitoringParams,
    monitoringDate,
    monitoringCategoryData,
    searchActivate,
    setOpenFilterSubParamActions,
    setExtractExtraFilterSearch,
    setNewsAddAllExtraFilterSearch,
  } = useMonitoringSearch()
  const [indexNm, setIndexNm] = useState(0)

  const changeState = () => {
    if (filterSubParamActions[indexNm]) {
      let param = [...filterSubParamActions]
      param[indexNm] = {
        ...param[indexNm],
        isOpen: !param[indexNm].isOpen,
      }
      setOpenFilterSubParamActions(param)
    }
  }

  useEffect(() => {
    const find = filterSubParamActions.findIndex(e => e.id === props.id)
    setIndexNm(() => (find ? find : 0))
  }, [filterSubParamActions])

  return (
    <li id={props.id + 'lnb-filter__menu-list_subNewsFilterListList'}>
      {filterSubParamActions[indexNm] && (
        <button
          type="button"
          className={`lnb-filter__menu-depth1 is-opened`}
          id={'lnb-filter__menu-depth1' + props.id}
          onClick={() => changeState()}
        >
          <span className="lnb-filter__menu-txt">{props.title}</span>
          {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].values.length > 0 && (
            <Fragment>
              <span className="lnb-filter__menu-txt type-count">
                {getCurrencyFormat(filterSubParamActions[indexNm].values.length)}
              </span>
              {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].isOpen && (
                <div
                  className="lnb-filter__menu-ico type-close"
                  onClick={() =>
                    monitoringCategoryData &&
                    setExtractExtraFilterSearch(
                      filterSubParamActions,
                      indexNm,
                      monitoringListParams,
                      monitoringParams,
                      monitoringDate,
                      monitoringCategoryData,
                      searchActivate,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                >
                  <IcoSvg data={icoSvgData.iconCloseButton2} />
                </div>
              )}
            </Fragment>
          )}
          <span className="lnb-filter__menu-ico type-chevron">
            <IcoSvg data={filterSubParamActions[indexNm].isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </span>
        </button>
      )}
      {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].isOpen && (
        <motion.ul
          className={cn('lnb-filter-depth2__list overflow-hidden')}
          initial={{
            height: 0,
          }}
          animate={{
            height: filterSubParamActions[indexNm].isOpen ? 'auto' : 0,
          }}
          transition={filterTransition}
        >
          {props.subMenus &&
            props.subMenus.length > 0 &&
            props.subMenus.map(i => (
              <SearchFilterItemSub
                key={'filterSearchData' + i.id + i.title}
                item={i}
                keyValue={indexNm}
              />
            ))}
          {props.subMenus && props.subMenus.length >= 3 && (
            <li>
              <div className="lnb-filter-depth3__checkbox">
                <Button
                  label={'전체 선택'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  disabled={
                    !!(
                      filterSubParamActions[indexNm] &&
                      filterSubParamActions[indexNm].values.length > 0 &&
                      filterSubParamActions[indexNm].values.length >= props.subMenus.length
                    )
                  }
                  onClick={() =>
                    monitoringCategoryData &&
                    props.subMenus &&
                    props.subMenus.length > 0 &&
                    setNewsAddAllExtraFilterSearch(
                      props.subMenus,
                      filterSubParamActions,
                      indexNm,
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

export default SearchFilterItem
