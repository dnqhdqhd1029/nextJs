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
const MediaSearchFilterItemSub = (props: Props) => {
  const {
    mediaLoading,
    filterMediaSubParamActions,
    savedMediaKey,
    isOwner,
    isFilterSubParam,
    mediaListParams,
    mediaDto,
    isLimitFilter,
    setMediaAddExtraFilterSearch,
  } = useSavedSearch()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (filterMediaSubParamActions[props.keyValue].values.length > 0) {
      const find = filterMediaSubParamActions[props.keyValue].values.find(
        k => k.toString() === props.item.id.toString()
      )
      setIsOpen(() => !!find)
    } else {
      setIsOpen(() => false)
    }
  }, [filterMediaSubParamActions[props.keyValue].values.length])

  return (
    <li key={'filterSearchData' + props.item.id + props.item.title}>
      <div className="lnb-filter-depth2__checkbox">
        {mediaLoading ? (
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
              {props.item.subMenus && props.item.subMenus?.length > 0 ? (
                <span className="count">{'(' + getCurrencyFormat(props.item.subMenus?.length) + ')'}</span>
              ) : (
                <span className="count">(0)</span>
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
            disabled={mediaLoading}
            checkDataLimit={30}
            count={
              props.item && props.item.subMenus && props.item.subMenus?.length > 0
                ? '(' + getCurrencyFormat(props.item.subMenus?.length) + ')'
                : '(0)'
            }
            checkDataLimitDisable={30 === isLimitFilter ? 'action' : 'non'}
            onClickEvent={() =>
              !mediaLoading &&
              isLimitFilter === 30 &&
              openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
            }
            onChange={e =>
              setMediaAddExtraFilterSearch(
                e,
                props.item,
                filterMediaSubParamActions,
                props.keyValue,
                mediaDto,
                mediaListParams,
                savedMediaKey,
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

export default MediaSearchFilterItemSub
