import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import PressSearchFilterItemWithSub from '~/components/contents/pressMedia/SavedSearch/LeftContent/Press/PressSearchFilterItemWithSub'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressSearchFilterItemSubMenu = (props: NavigationLinkItem) => {
  const {
    filterJournalSubParamActions,
    pressDto,
    savedJournalKey,
    isOwner,
    isFilterSubParam,
    pressListParams,
    setOpenfilterJournalSubParamActions,
    setPressExtractExtraFilterSearch,
  } = useSavedSearch()
  const [indexNm, setIndexNm] = useState(0)

  const changeState = () => {
    if (filterJournalSubParamActions[indexNm]) {
      let param = [...filterJournalSubParamActions]
      param[indexNm] = {
        ...param[indexNm],
        isOpen: !param[indexNm].isOpen,
      }
      setOpenfilterJournalSubParamActions(param)
    }
  }

  useEffect(() => {
    const find = filterJournalSubParamActions.findIndex(e => e.id === props.id)
    setIndexNm(() => (find ? find : 0))
  }, [filterJournalSubParamActions])

  return (
    <li id={props.id + 'lnb-filter__menu-list_subNewsFilterListList'}>
      {filterJournalSubParamActions[indexNm] && (
        <button
          type="button"
          className={`lnb-filter__menu-depth1 is-opened`}
          id={'lnb-filter__menu-depth1' + props.id}
          onClick={() => changeState()}
        >
          <span className="lnb-filter__menu-txt">{props.title}</span>
          {filterJournalSubParamActions[indexNm] && filterJournalSubParamActions[indexNm].values.length > 0 && (
            <Fragment>
              <span className="lnb-filter__menu-txt type-count">
                {getCurrencyFormat(filterJournalSubParamActions[indexNm].values.length)}
              </span>
              {filterJournalSubParamActions[indexNm] && filterJournalSubParamActions[indexNm].isOpen && (
                <div
                  className="lnb-filter__menu-ico type-close"
                  onClick={() =>
                    setPressExtractExtraFilterSearch(
                      filterJournalSubParamActions,
                      indexNm,
                      pressDto,
                      pressListParams,
                      savedJournalKey,
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
            <IcoSvg
              data={filterJournalSubParamActions[indexNm].isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp}
            />
          </span>
        </button>
      )}
      {filterJournalSubParamActions[indexNm] && filterJournalSubParamActions[indexNm].isOpen && (
        <motion.ul
          className={cn('lnb-filter-depth2__list type-submenu overflow-hidden')}
          initial={{
            height: 0,
          }}
          animate={{
            height: filterJournalSubParamActions[indexNm].isOpen ? 'auto' : 0,
          }}
          transition={filterTransition}
        >
          {props.subMenus &&
            props.subMenus.length > 0 &&
            props.subMenus.map((i, sIndex) => (
              <PressSearchFilterItemWithSub
                key={'PressSearchFilterItemWithSub' + i.id + i.title}
                item={i}
                keyIndex={sIndex}
                keyValue={indexNm}
              />
            ))}
        </motion.ul>
      )}
    </li>
  )
}

export default PressSearchFilterItemSubMenu
