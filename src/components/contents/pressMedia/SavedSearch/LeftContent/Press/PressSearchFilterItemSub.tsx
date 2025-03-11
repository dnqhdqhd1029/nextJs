import { useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import Skeleton from '~/components/common/ui/Skeleton'
import { NavigationLinkItem } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

interface Props {
  item: NavigationLinkItem
  keyValue: number
}
const PressSearchFilterItemSub = (props: Props) => {
  const {
    journalLoading,
    filterJournalSubParamActions,
    savedJournalKey,
    isOwner,
    isFilterSubParam,
    pressListParams,
    pressDto,
    isLimitFilter,
    setPressAddExtraFilterSearch,
  } = useSavedSearch()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (filterJournalSubParamActions[props.keyValue].values.length > 0) {
      const find = filterJournalSubParamActions[props.keyValue].values.find(
        k => k.toString() === props.item.id.toString()
      )
      setIsOpen(() => !!find)
    } else {
      setIsOpen(() => false)
    }
  }, [filterJournalSubParamActions[props.keyValue].values.length])

  return (
    <li key={'filterSearchData' + props.item.id + props.item.title}>
      <div className="lnb-filter-depth2__checkbox">
        {journalLoading ? (
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
              {props.item.subMenus && props.item.subMenus.length > 0 ? (
                <span className="count">{'(' + getCurrencyFormat(props.item.subMenus?.length) + ')'}</span>
              ) : (
                <span className="count">{'(0)'}</span>
              )}
            </label>
          </div>
        ) : (
          <FormInputBtn
            type="checkbox"
            name={props.item.id}
            id={props.item.id}
            label={props.item.title}
            checked={isOpen}
            disabled={journalLoading}
            checkDataLimit={30}
            count={
              props.item && props.item.subMenus && props.item.subMenus?.length > 0
                ? '(' + getCurrencyFormat(props.item.subMenus?.length) + ')'
                : '(0)'
            }
            checkDataLimitDisable={30 === isLimitFilter ? 'action' : 'non'}
            onClickEvent={() =>
              !journalLoading &&
              isLimitFilter === 30 &&
              openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
            }
            onChange={e =>
              setPressAddExtraFilterSearch(
                e,
                props.item,
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
  )
}

export default PressSearchFilterItemSub
