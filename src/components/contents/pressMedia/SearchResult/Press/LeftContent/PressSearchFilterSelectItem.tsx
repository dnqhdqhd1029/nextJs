import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import { NavigationLinkItem } from '~/types/common'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const PressSearchFilterSelectItem = (props: NavigationLinkItem) => {
  const {
    filterJournalSubParamActions,
    pressDto,
    pressListParams,
    setOpenfilterJournalSubParamActions,
    setPressAddExtraSelectedFilterSearch,
    setPressExtractExtraFilterSearch,
  } = usePressMediaSearchResult()
  const [indexNm, setIndexNm] = useState(0)
  const [isSelected, setIsSelected] = useState<{ id: string; title: string }>({ id: '', title: '' })

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

  useEffect(() => {
    const find = props?.subMenus?.find(e => e.id === filterJournalSubParamActions[indexNm].values[0])
    const res = find ? { id: find.id, title: find.title || '' } : { id: '', title: '' }
    setIsSelected(() => res)
  }, [filterJournalSubParamActions[indexNm].values])

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
              <span className="lnb-filter__menu-txt type-count">{isSelected.title}</span>
              {filterJournalSubParamActions[indexNm] && filterJournalSubParamActions[indexNm].isOpen && (
                <div
                  className="lnb-filter__menu-ico type-close"
                  onClick={() =>
                    setPressExtractExtraFilterSearch(filterJournalSubParamActions, indexNm, pressDto, pressListParams)
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
          className={cn('lnb-filter-depth2__list type-date')}
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
                    setPressAddExtraSelectedFilterSearch(
                      i,
                      filterJournalSubParamActions,
                      indexNm,
                      pressDto,
                      pressListParams
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

export default PressSearchFilterSelectItem
