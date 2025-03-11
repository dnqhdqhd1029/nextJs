import { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import OwnerItem from '~/components/common/ui/OwnerItem'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import ShareItem from '~/components/contents/pressMedia/SearchManagement/Press/Content/ShareItem'
import { pressContentListProps } from '~/stores/modules/contents/pressMedia/pressSearchManagement'
import { UserDtoForGroup } from '~/types/api/service'
import { getDateFormat } from '~/utils/common/date'
import { usePressSavedSearchManagement } from '~/utils/hooks/contents/pressMedia/usePressSavedSearchManagement'

const ContentItem = (props: pressContentListProps) => {
  const router = useRouter()
  const {
    userInfo,
    licenseInfo,
    timeZone,
    ownerGroup,
    setOtherActions,
    ownerFunction,
    onMoveUrlClickCheck,
    getOwnerLayer,
    setOwnerPopupAction,
  } = usePressSavedSearchManagement()

  const [isOption, setIsOption] = useState(false)
  const activityOpenRef = useRef<HTMLDivElement>(null)

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

  return (
    <li
      onClick={e => {
        props.contact_id && onMoveUrlClickCheck(e.target as HTMLElement, props.contact_id)
        e.preventDefault()
      }}
    >
      <a
        href={`/contacts/saved-search?journal_contact_id=${props.contact_id}`}
        onClick={e => e.preventDefault()}
      >
        <div
          className={'list-type4-item__section'}
          id={props.contact_id?.toString() || ''}
          ref={activityOpenRef}
        >
          <ul className="list-type4-item__list">
            <li
              className="list-type4-item__title type-flex-grow"
              onClick={e => {
                router.push(`/contacts/saved-search?journal_contact_id=${props.contact_id}`)
                e.preventDefault()
              }}
            >
              <p className="list-type4-item__text">
                <span>{props.title}</span>
                {/* {props.isOwner && <IcoSvg data={icoSvgData.personLineBroken} />} */}
              </p>
            </li>
            <li className="list-type4-item__group">
              <p className="list-type4-item__text">
                {licenseInfo.flagGroup && props.shareTargetCode !== 'GROUP' ? '전체 그룹' : ''}
              </p>
            </li>
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
              id={props.contact_id || 0}
              title={props.title || ''}
              keyString={'pressId'}
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
                    ? getDateFormat(timeZone, props.regisAt?.toString() || '')
                    : getDateFormat(timeZone, props.updateAt?.toString() || '')}
                </p>
              </div>
            </li>
            <li className="list-type4-item__more">
              <TableDropDownItem
                isOption={isOption}
                setIsOption={i => setIsOption(i)}
                settingList={props.settingList}
                tableDropDownAction={(i, k) => setOtherActions(i, props)}
              />
            </li>
          </ul>
        </div>
      </a>
    </li>
  )
}

export default ContentItem
