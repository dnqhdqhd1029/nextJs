import { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import moment from 'moment/moment'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SearchFilterItemSub from '~/components/contents/activity/common/SearchNavigation/SearchFilterItemSub'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const CheckboxInputItem = (props: NavigationLinkItem) => {
  const {
    filterSubParamActions,
    apiParams,
    setOpenfilterSubParamActions,
    setExtractExtraFilterSearch,
    setAddAllExtraFilterSearch,
  } = useActivityList()
  const { getInputRef } = useValidate()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [indexNm, setIndexNm] = useState(0)
  const [isKeyword, setIsKeyword] = useState<string>('')
  const [taskList, setTaskList] = useState<NavigationLinkItem[]>([])

  const changeState = () => {
    if (filterSubParamActions[indexNm]) {
      let param = [...filterSubParamActions]
      param[indexNm] = {
        ...param[indexNm],
        isOpen: !param[indexNm].isOpen,
      }
      setOpenfilterSubParamActions(param)
    }
  }

  const handleKeywordsDelete = () => {
    setIsKeyword(() => '')
    setTaskList(() => (props?.subMenus || []) as NavigationLinkItem[])
  }

  const handleKeywordsOnChange = async (e: string) => {
    if (props.subMenus && props.subMenus.length > 0) {
      let res: NavigationLinkItem[] = []
      for await (const eElement of props.subMenus) {
        if (eElement.id && eElement.title) {
          if (eElement.title.toLowerCase().search(e.toLowerCase()) !== -1) {
            res = [...res, eElement]
          }
        }
      }
      setIsKeyword(() => e)
      setTaskList(() => (res.length > 0 ? res : props.subMenus) as NavigationLinkItem[])
    }
  }
  useEffect(() => {
    const find = filterSubParamActions.findIndex(e => e.id === props.id)
    setIndexNm(() => (find ? find : 0))
  }, [filterSubParamActions])

  useEffect(() => {
    if (props.id !== 'category' && props.id !== 'state' && props.subMenus && props.subMenus.length > 0) {
      setTaskList(() => props.subMenus as NavigationLinkItem[])
    }
  }, [props.subMenus])

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
          {filterSubParamActions[indexNm].values && filterSubParamActions[indexNm].values.length > 0 && (
            <Fragment>
              <span className="lnb-filter__menu-txt type-count">
                {getCurrencyFormat(filterSubParamActions[indexNm].values.length)}
              </span>
              {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].isOpen && (
                <div
                  className="lnb-filter__menu-ico type-close"
                  onClick={() => setExtractExtraFilterSearch(filterSubParamActions, indexNm, apiParams)}
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
          {props.id !== 'category' && props.id !== 'state' ? (
            <Fragment>
              {props.subMenus && props.subMenus.length >= 10 && (
                <li>
                  <div className="lnb-filter__search">
                    <FormInputSearch
                      id={'list-search' + props.id}
                      name={'list-search' + props.id}
                      onChange={e => handleKeywordsOnChange(e.target.value)}
                      getInputRef={ref => getInputRef(ref, searchInputRef)}
                      onKeyUp={() => handleKeywordsOnChange(searchInputRef?.current?.value || '')}
                      value={isKeyword}
                      onDeleteButtonClick={() => handleKeywordsDelete()}
                    />
                  </div>
                </li>
              )}
              <ul style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                {taskList &&
                  taskList.length > 0 &&
                  taskList.map(i => (
                    <SearchFilterItemSub
                      key={'filterSearchData' + i.id + i.title}
                      item={i}
                      filterTypeKey={props.id}
                      keyValue={indexNm}
                    />
                  ))}
              </ul>
            </Fragment>
          ) : (
            <Fragment>
              {props.subMenus &&
                props.subMenus.length > 0 &&
                props.subMenus.map(i => (
                  <SearchFilterItemSub
                    key={'filterSearchData' + i.id + i.title}
                    item={i}
                    keyValue={indexNm}
                  />
                ))}
            </Fragment>
          )}
        </motion.ul>
      )}
    </li>
  )
}

export default CheckboxInputItem
