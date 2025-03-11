import { useEffect, useState } from 'react'
import cn from 'classnames'
import moment from 'moment'
import { useRouter } from 'next/router'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { searchContentListProps } from '~/stores/modules/contents/activity/searchActivity'
import { getDateFormat } from '~/utils/common/date'
import { handleNonBreakSpace } from '~/utils/common/number'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const checkClasses = [
  'ico',
  'button__label button-link-text-arrow__label size-l',
  'button__label button-link-text-arrow__label size-m',
  'ipt-checkbox__group',
]

const ContentItem = (props: searchContentListProps) => {
  const {
    searchContentKeyList,
    commonCodeCategory,
    commonCodeStateFilter,
    commonCodeState,
    timeZone,
    apiParams,
    setSearchContentKeyList,
    setActivityIdParamsAction,
    activityId,
  } = useActivityList()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const find = searchContentKeyList.find(e => e?.actionId === props?.actionId)
    setIsChecked(() => !!find)
  }, [searchContentKeyList])

  if (!props.actionId) {
    return null
  }
  return (
    <li
      id={'li_actionId' + props.actionId?.toString() || ''}
      onClick={e => {
        const aTarget = e.target as HTMLElement
        if (aTarget.className && typeof aTarget.className === 'string') {
          const isInList = checkClasses.some(className => aTarget.className.includes(className))
          if (!isInList) {
            props.actionId &&
              setActivityIdParamsAction(
                props.actionId,
                apiParams,
                commonCodeCategory,
                commonCodeStateFilter,
                commonCodeState
              )
            e.preventDefault()
          }
        } else {
          props.actionId &&
            setActivityIdParamsAction(
              props.actionId,
              apiParams,
              commonCodeCategory,
              commonCodeStateFilter,
              commonCodeState
            )
          e.preventDefault()
        }
      }}
    >
      <div
        className={cn('list-type5-item__section', { 'is-selected': activityId === props.actionId })}
        id={props.actionId?.toString() || ''}
      >
        <ul className="list-type5-item__list">
          <li
            className="list-type5-item__check"
            onClick={e => {
              props.actionId && setSearchContentKeyList(!isChecked, props, searchContentKeyList)
              e.preventDefault()
            }}
          >
            <FormInputBtn
              type="checkbox"
              name={'search-result__header-sort searchContentList' + props.actionId?.toString() || ''}
              id={'search-result__header-sort searchContentList' + props.actionId?.toString() || ''}
              checked={isChecked}
              label=""
              //onChange={e => props.actionId && setSearchContentKeyList(e, props, searchContentKeyList)}
            />
          </li>
          <li className="list-type5-item__contents type-flex-grow">
            <a
              href={`/activity/record/${props?.actionId}`}
              className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'body-text'}`)}
            >
              <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'l'}`)}>
                {props.category === 'PRESS_RELEASE' ? props?.titleForManage : props?.title || ''}
              </span>
            </a>
            <p className="list-type5-contents__text">
              {props.categoryName} {props.stateName}
            </p>
            <div className="list-type5-contents__flex">
              <div className="list-type5-contents__comment">
                {props.commentCount && props.commentCount > 0 ? (
                  <p className="list-type5-contents__text">댓글 {props.commentCount}</p>
                ) : (
                  <p className="list-type5-contents__text"></p>
                )}
              </div>
              <p className="list-type5-contents__text">
                {props.cuType === 'CREATE'
                  ? getDateFormat(timeZone, props?.regisAt || '', true)
                  : getDateFormat(timeZone, props?.updateAt || '', true)}
                {handleNonBreakSpace(2)}
                {props.owner && props.owner.displayName}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default ContentItem
