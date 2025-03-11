import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import { NavigationLinkItem } from '~/types/common'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const MediaSearchFilterSelectItem = (props: NavigationLinkItem) => {
  const {
    filterMediaSubParamActions,
    mediaDto,
    mediaListParams,
    setOpenfilterMediaSubParamActions,
    setMediaAddExtraSelectedFilterSearch,
    setMediaExtractExtraFilterSearch,
  } = usePressMediaSearchResult()
  const [indexNm, setIndexNm] = useState(0)
  const [isSelected, setIsSelected] = useState<{ id: string; title: string }>({ id: '', title: '' })

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

  useEffect(() => {
    const find = props?.subMenus?.find(e => e.id === filterMediaSubParamActions[indexNm].values[0])
    const res = find ? { id: find.id, title: find.title || '' } : { id: '', title: '' }
    setIsSelected(() => res)
  }, [filterMediaSubParamActions[indexNm].values])

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
              <span className="lnb-filter__menu-txt type-count">{isSelected.title}</span>
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
          className={cn('lnb-filter-depth2__list type-date')}
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
            props.subMenus.map(i => (
              <li key={'filterSearchData' + i.id + i.title}>
                <button
                  type="button"
                  className={cn('lnb-filter-depth2__button', {
                    'is-selected': i.id === isSelected.id,
                  })}
                  disabled={!(i.subMenus && i.subMenus.length > 0)}
                  onClick={() =>
                    i.subMenus &&
                    i.subMenus.length > 0 &&
                    setMediaAddExtraSelectedFilterSearch(
                      i,
                      filterMediaSubParamActions,
                      indexNm,
                      mediaDto,
                      mediaListParams
                    )
                  }
                >
                  <span className="lnb-filter__menu-txt">{i.title}</span>
                </button>
              </li>
            ))}
        </motion.ul>
      )}
    </li>
  )
}

export default MediaSearchFilterSelectItem
