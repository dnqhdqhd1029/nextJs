import { useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import PressSearchFilterItemSub from '~/components/contents/pressMedia/SavedSearch/LeftContent/Press/PressSearchFilterItemSub'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

interface Props {
  item: NavigationLinkItem
  keyIndex: number
  keyValue: number
}
const PressSearchFilterItemWithSub = (props: Props) => {
  const {
    filterJournalSubParamActions,
    isOwner,
    isFilterSubParam,
    savedJournalKey,
    pressListParams,
    pressDto,
    setPressAddAllExtraFilterSearch,
    setPressDeleteGroupExtraFilterSearch,
  } = useSavedSearch()
  const [isOpen, setIsOpen] = useState(false)
  const [isMaxGroupSelected, setIsMaxGroupSelected] = useState(false)
  const checkTotalValue = async () => {
    let res = false
    if (
      filterJournalSubParamActions &&
      props.item.subMenus &&
      filterJournalSubParamActions[props.keyValue] &&
      filterJournalSubParamActions[props.keyValue].values.length > 0
    ) {
      const tempFilterSubParam = [...filterJournalSubParamActions]
      const getIdParams = props.item.subMenus.map(e => e.id)
      const difference = tempFilterSubParam[props.keyValue].values.filter(item => getIdParams.includes(item))
      if (difference) {
        res = difference.length >= getIdParams.length
      }
    }
    setIsMaxGroupSelected(() => res)
  }

  useEffect(() => {
    checkTotalValue()
  }, [filterJournalSubParamActions])

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
          <span className="lnb-filter__menu-txt type-submenu">({getCurrencyFormat(props.item.subMenus?.length)})</span>
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
              <PressSearchFilterItemSub
                key={'filterSearchData' + i.id + i.title}
                item={i}
                keyValue={props.keyValue}
              />
            ))}
          {props.item.subMenus && props.item.subMenus.length >= 3 && (
            <li>
              <div className="lnb-filter-depth3__checkbox">
                {isMaxGroupSelected ? (
                  <Button
                    label={'전체 선택'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-text'}
                    onClick={() =>
                      props.item.subMenus &&
                      props.item.subMenus.length > 0 &&
                      setPressDeleteGroupExtraFilterSearch(
                        props.item.subMenus,
                        filterJournalSubParamActions,
                        props.keyValue,
                        pressDto,
                        pressListParams,
                        savedJournalKey,
                        isOwner,
                        isFilterSubParam
                      )
                    }
                  />
                ) : (
                  <Button
                    label={'전체 선택'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-text'}
                    onClick={() =>
                      props.item.subMenus &&
                      props.item.subMenus.length > 0 &&
                      setPressAddAllExtraFilterSearch(
                        props.item.subMenus,
                        filterJournalSubParamActions,
                        props.keyValue,
                        pressDto,
                        pressListParams,
                        savedJournalKey,
                        isOwner,
                        isFilterSubParam
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

export default PressSearchFilterItemWithSub
