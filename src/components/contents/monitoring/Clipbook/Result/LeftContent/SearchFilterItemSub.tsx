import { useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import Skeleton from '~/components/common/ui/Skeleton'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { getHightlightedText } from '~/utils/common/string'
import { openToast } from '~/utils/common/toast'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

interface Props {
  item: NavigationLinkItem
  keyValue: number
}
const SearchFilterItemSub = (props: Props) => {
  const {
    newsLoading,
    isOwner,
    isFilterSubParam,
    clipbookIdKey,
    isLimitFilter,
    monitoringListParams,
    clipbookDataCatgory,
    filterSubParamActions,
    setAddExtraFilterSearch,
  } = useClipbookDetail()
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
        {newsLoading ? (
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
                <span className="count">{0}</span>
              )}
            </label>
          </div>
        ) : (
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
            onChange={e =>
              clipbookDataCatgory &&
              setAddExtraFilterSearch(
                e,
                props.item,
                filterSubParamActions,
                props.keyValue,
                monitoringListParams,
                clipbookIdKey,
                isOwner,
                isFilterSubParam
              )
            }
          />
        )}
      </div>
    </li>
  )
}

export default SearchFilterItemSub
