import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import SearchFilterItemWithSub from '~/components/contents/monitoring/Clipbook/Result/LeftContent/SearchFilterItemWithSub'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const SearchFilterItemSubMenu = (props: NavigationLinkItem) => {
  const {
    isOwner,
    isFilterSubParam,
    clipbookIdKey,
    filterSubParamActions,
    clipbookDataCatgory,
    monitoringListParams,
    setOpenFilterSubParamActions,
    setExtractExtraFilterSearch,
  } = useClipbookDetail()
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
  }, [clipbookDataCatgory])

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
                    clipbookDataCatgory &&
                    setExtractExtraFilterSearch(
                      filterSubParamActions,
                      indexNm,
                      monitoringListParams,
                      clipbookIdKey,
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
          className={cn('lnb-filter-depth2__list type-submenu overflow-hidden')}
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
              <SearchFilterItemWithSub
                key={'filterSubDataSearchData' + i.id + i.title}
                item={i}
                keyValue={indexNm}
              />
            ))}
        </motion.ul>
      )}
    </li>
  )
}

export default SearchFilterItemSubMenu
