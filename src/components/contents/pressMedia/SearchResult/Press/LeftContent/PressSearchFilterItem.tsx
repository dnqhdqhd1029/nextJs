import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import PressSearchFilterItemSub from '~/components/contents/pressMedia/SearchResult/Press/LeftContent/PressSearchFilterItemSub'
import { NavigationLinkItem } from '~/types/common'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const PressSearchFilterItem = (props: NavigationLinkItem) => {
  const {
    pressListParams,
    pressDto,
    filterJournalSubParamActions,
    setOpenfilterJournalSubParamActions,
    setPressAddAllExtraFilterSearch,
    setPressExtractExtraFilterSearch,
  } = usePressMediaSearchResult()
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
          {filterJournalSubParamActions[indexNm].values && filterJournalSubParamActions[indexNm].values.length > 0 && (
            <Fragment>
              <span className="lnb-filter__menu-txt type-count">
                {filterJournalSubParamActions[indexNm].values.length}
              </span>
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
          className={cn('lnb-filter-depth2__list overflow-hidden')}
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
              <PressSearchFilterItemSub
                key={'filterSearchData' + i.id + i.title}
                item={i}
                keyValue={indexNm}
              />
            ))}
          {props.subMenus && props.subMenus.length >= 3 && (
            <li>
              <div className="lnb-filter-depth3__checkbox">
                {filterJournalSubParamActions[indexNm] &&
                filterJournalSubParamActions[indexNm].values.length > 0 &&
                filterJournalSubParamActions[indexNm].values.length >= props.subMenus.length ? (
                  <Button
                    label={'전체 선택'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-text'}
                    onClick={() =>
                      setPressExtractExtraFilterSearch(filterJournalSubParamActions, indexNm, pressDto, pressListParams)
                    }
                  />
                ) : (
                  <Button
                    label={'전체 선택'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-text'}
                    onClick={() =>
                      props.subMenus &&
                      props.subMenus.length > 0 &&
                      setPressAddAllExtraFilterSearch(
                        props.subMenus,
                        filterJournalSubParamActions,
                        indexNm,
                        pressDto,
                        pressListParams
                      )
                    }
                  />
                )}
              </div>
            </li>
          )}
        </motion.ul>
      )}
    </li>
  )
}

export default PressSearchFilterItem
