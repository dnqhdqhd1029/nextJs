import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import OwnerItem from '~/components/common/ui/OwnerItem'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import ShareItem from '~/components/contents/pressMedia/List/Search/Media/Content/ShareItem'
import { mediaContentListProps } from '~/stores/modules/contents/pressMedia/mediaListManagement'
import { UserDtoForGroup } from '~/types/api/service'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { getDateFormat } from '~/utils/common/date'
import { openToast } from '~/utils/common/toast'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const ContentItem = (props: mediaContentListProps) => {
  const router = useRouter()
  const {
    userInfo,
    timeZone,
    searchContentKeyList,
    pageCount,
    ownerGroup,
    setSearchContentKeyList,
    setOtherActions,
    ownerFunction,
    onMoveUrlClickCheck,
    getOwnerLayer,
    setOwnerPopupAction,
  } = useMediaListManagement()
  const activityOpenRef = useRef<HTMLDivElement>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [isOption, setIsOption] = useState(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (activityOpenRef.current && !activityOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  useEffect(() => {
    const find = searchContentKeyList.find(e => (e?.mediaListId || '').toString() === props.mediaListId?.toString())
    setIsChecked(() => !!find)
  }, [searchContentKeyList])

  return (
    <li
      onClick={e => {
        props.mediaListId && onMoveUrlClickCheck(e.target as HTMLElement, props.mediaListId)
        e.preventDefault()
      }}
    >
      <a
        href={`/media/list-result?mediaList_id=${props.mediaListId}`}
        onClick={e => e.preventDefault()}
      >
        <div
          className={cn('list-type4-item__section', { 'is-selected': isSelected })}
          id={props.mediaListId?.toString() || ''}
          ref={activityOpenRef}
        >
          <ul className="list-type4-item__list">
            <li
              className="list-type4-item__check"
              onClick={e => {
                props.mediaListId && setSearchContentKeyList(!isChecked, props, searchContentKeyList)
                e.preventDefault()
              }}
            >
              <FormInputBtn
                type="checkbox"
                name={'search-result__header-sort props.mediaListId' + props.mediaListId?.toString() || ''}
                id={'search-result__header-sort props.mediaListId' + props.mediaListId?.toString() || ''}
                checked={isChecked}
                label=""
                //onChange={e => props.mediaListId && setSearchContentKeyList(e, props, searchContentKeyList)}
              />
            </li>
            <li
              className="list-type4-item__title type-flex-grow"
              onClick={e => {
                router.push(`/media/list-result?mediaList_id=${props.mediaListId}`)
                e.preventDefault()
              }}
            >
              <p className="list-type4-item__text">
                <span>{props.title}</span>
                {/* {props.isOwner && <IcoSvg data={icoSvgData.personLineBroken} />} */}
              </p>
            </li>

            {props.mediaCount && props.mediaCount > 0 ? (
              <li className="list-type4-item__group">
                <p className="list-type4-item__text">{props.mediaCount}개</p>
              </li>
            ) : (
              <li className="list-type4-item__group">
                <p className="list-type4-item__text"></p>
              </li>
            )}

            {userInfo.userId === props.owner?.userId ? (
              <ShareItem {...props} />
            ) : (
              <li className="list-type4-item__share-filter">
                <div className="select__section select-type1-small">
                  <button
                    className="select__label pointer-events-none"
                    // style={{ cursor: 'unset' }}
                  >
                    <span className="select__label-text">{props?.shareCodeNm}</span>
                  </button>
                </div>
              </li>
            )}
            <OwnerItem
              id={props.mediaListId || 0}
              title={props.title || ''}
              keyString={'mediaId'}
              owner={props.owner as UserDtoForGroup}
              ownerGroup={ownerGroup}
              userInfo={userInfo}
              getOwnerLayer={getOwnerLayer}
              setOwnerPopupAction={setOwnerPopupAction}
              ownerFunction={ownerFunction}
            />
            <li className="list-type4-item__history">
              <div className="list-type4-item__history-user">
                <p className="list-type4-item__text">
                  {props.regisAt === props.updateAt
                    ? props.register?.displayName + ' 생성' || ''
                    : props.updater?.displayName + ' 수정' || ''}
                </p>
              </div>
              <div className="list-type4-item__history-date">
                <p className="list-type4-item__text">
                  {props.regisAt === props.updateAt
                    ? getDateFormat(timeZone, props.regisAt)
                    : getDateFormat(timeZone, props.updateAt)}
                </p>
              </div>
            </li>
            <li className="list-type4-item__more">
              <TableDropDownItem
                isOption={isOption}
                setIsOption={i => setIsOption(i)}
                settingList={props.settingList}
                tableDropDownAction={(e, k) => setOtherActions(e, props)}
              />
            </li>
          </ul>
        </div>
      </a>
    </li>
  )
}

export default ContentItem
