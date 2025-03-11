import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import MediaSearchFilterItemWithSub from '~/components/contents/pressMedia/SearchResult/Media/LeftContent/MediaSearchFilterItemWithSub'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const MediaSearchFilterItemSubMenu = (props: NavigationLinkItem) => {
  const {
    filterMediaSubParamActions,
    mediaDto,
    mediaListParams,
    setOpenfilterMediaSubParamActions,
    setMediaExtractExtraFilterSearch,
  } = usePressMediaSearchResult()
  const [indexNm, setIndexNm] = useState(0)

  const changeState = () => {
    if (filterMediaSubParamActions[indexNm]) {
      let param = [...filterMediaSubParamActions]
      param[indexNm] = {
        ...param[indexNm],
        isOpen: !param[indexNm].isOpen,
      }
      setOpenfilterMediaSubParamActions(param)
    }
  }

  useEffect(() => {
    const find = filterMediaSubParamActions.findIndex(e => e.id === props.id)
    setIndexNm(() => (find ? find : 0))
  }, [filterMediaSubParamActions])

  return (
    <li id={props.id + 'lnb-filter__menu-list_subNewsFilterListList'}>
      {filterMediaSubParamActions[indexNm] && (
        <button
          type="button"
          className={`lnb-filter__menu-depth1 is-opened`}
          id={'lnb-filter__menu-depth1' + props.id}
          onClick={() => changeState()}
        >
          <span className="lnb-filter__menu-txt">{props.title}</span>
          {filterMediaSubParamActions[indexNm] && filterMediaSubParamActions[indexNm].values.length > 0 && (
            <Fragment>
              {filterMediaSubParamActions[indexNm] && filterMediaSubParamActions[indexNm].values.length > 0 && (
                <span className="lnb-filter__menu-txt type-count">
                  {getCurrencyFormat(filterMediaSubParamActions[indexNm].values.length)}
                </span>
              )}
              {filterMediaSubParamActions[indexNm] && filterMediaSubParamActions[indexNm].isOpen && (
                <div
                  className="lnb-filter__menu-ico type-close"
                  onClick={() =>
                    setMediaExtractExtraFilterSearch(filterMediaSubParamActions, indexNm, mediaDto, mediaListParams)
                  }
                >
                  <IcoSvg data={icoSvgData.iconCloseButton2} />
                </div>
              )}
            </Fragment>
          )}
          <span className="lnb-filter__menu-ico type-chevron">
            <IcoSvg data={filterMediaSubParamActions[indexNm].isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </span>
        </button>
      )}
      {filterMediaSubParamActions[indexNm] && filterMediaSubParamActions[indexNm].isOpen && (
        <motion.ul
          className={cn('lnb-filter-depth2__list type-submenu overflow-hidden')}
          initial={{
            height: 0,
          }}
          animate={{
            height: filterMediaSubParamActions[indexNm].isOpen ? 'auto' : 0,
          }}
          transition={filterTransition}
        >
          {props.subMenus &&
            props.subMenus.length > 0 &&
            props.subMenus.map((i, sIndex) => (
              <MediaSearchFilterItemWithSub
                key={'MediaSearchFilterItemWithSub' + i.id + i.title}
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

export default MediaSearchFilterItemSubMenu
