import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import moment from 'moment'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { IcoPersonLineBroken } from '~/components/common/ui/IcoGroup'
import Skeleton from '~/components/common/ui/Skeleton'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

interface Props {
  filterTypeKey?: string
  item: NavigationLinkItem
  keyValue: number
}
const SearchFilterItemSub = (props: Props) => {
  const { searchContentLoading, userInfo, filterSubParamActions, isLimitFilter, apiParams, setAddExtraFilterSearch } =
    useActivityList()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (filterSubParamActions[props.keyValue].values.length > 0) {
      const find = filterSubParamActions[props.keyValue].values.find(k => k.toString() === props.item.id.toString())
      setIsOpen(() => !!find)
    } else {
      setIsOpen(() => false)
    }
  }, [filterSubParamActions[props.keyValue].values.length])

  return (
    <li key={'filterSearchData' + props.item.id + props.item.title}>
      <div className="lnb-filter-depth2__checkbox">
        {searchContentLoading ? (
          <div className={cn(`ipt-${'checkbox'}__group`)}>
            <input
              type={'checkbox'}
              name={props.item.id}
              id={props.item.id}
              readOnly={true}
              checked={isOpen}
            />
            <label
              htmlFor={props.item.id}
              style={{ userSelect: 'none' }}
            >
              <span className="ico"></span>
              <div
                className={cn('label')}
                style={{
                  width: 'auto',
                }}
              >
                {props.item.title}
              </div>
              {props.item && props.item.subMenus && props.item.subMenus?.length > 0 ? (
                <span className="count">{'(' + getCurrencyFormat(props.item.subMenus?.length) + ')'}</span>
              ) : (
                <span className="count">{'(0)'}</span>
              )}
            </label>
          </div>
        ) : (
          <Fragment>
            <FormInputBtn
              type="checkbox"
              name={props.item.id}
              id={props.item.id}
              label={props.item.title}
              count={
                props.item && props.item.subMenus && props.item.subMenus?.length > 0
                  ? '(' + getCurrencyFormat(props.item.subMenus?.length) + ')'
                  : '(0)'
              }
              checkDataLimit={30}
              checkDataLimitDisable={30 === isLimitFilter ? 'action' : 'non'}
              checked={isOpen}
              onClickEvent={() =>
                isLimitFilter === 30 &&
                openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
              }
              isOwnerIcon={
                props.filterTypeKey && props.filterTypeKey === 'owner' && userInfo?.userId
                  ? props.item.id.toString() === userInfo.userId.toString()
                  : false
              }
              onChange={e => setAddExtraFilterSearch(e, props.item, filterSubParamActions, props.keyValue, apiParams)}
            />
          </Fragment>
        )}
      </div>
    </li>
  )
}

export default SearchFilterItemSub
