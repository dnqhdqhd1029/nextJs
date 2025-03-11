import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import OwnerItem from '~/components/common/ui/OwnerItem'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import ShareItem from '~/components/contents/monitoring/Management/Content/ShareItem'
import { managementContentListProps } from '~/stores/modules/contents/monitoring/management'
import { UserDtoForGroup } from '~/types/api/service'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { getDateFormat } from '~/utils/common/date'
import { openToast } from '~/utils/common/toast'
import { useMonitoringManagement } from '~/utils/hooks/contents/monitoring/useManagement'

const ContentItem = (props: managementContentListProps) => {
  const router = useRouter()
  const {
    categoryTotalList,
    timeZone,
    userInfo,
    licenseInfo,
    ownerGroup,
    setOtherActions,
    ownerFunction,
    onMoveUrlClickCheck,
    getOwnerLayer,
    setOwnerPopupAction,
  } = useMonitoringManagement()

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
        props.newsSrchId && onMoveUrlClickCheck(e.target as HTMLElement, props.newsSrchId)
        e.preventDefault()
      }}
    >
      <a
        href={`/news/monitoring?monitoring_id=${props.newsSrchId}`}
        onClick={e => e.preventDefault()}
      >
        <div
          className={'list-type4-item__section'}
          id={props.newsSrchId?.toString() || ''}
          ref={activityOpenRef}
        >
          <ul className="list-type4-item__list">
            <li
              className="list-type4-item__title type-flex-grow"
              onClick={e => {
                router.push(`/news/monitoring?monitoring_id=${props.newsSrchId}`)
                e.preventDefault()
              }}
            >
              <p className="list-type4-item__text">
                <span>{props.title}</span>
                {/* {props.isOwner && <IcoSvg data={icoSvgData.personLineBroken} />} */}
                {props?.isNewsAlert && <IcoSvg data={icoSvgData.bell} />}
              </p>
            </li>
            <li className="list-type4-item__group">
              <p className="list-type4-item__text">
                {licenseInfo.flagGroup && props.shareTargetCode === 'COMPANY' ? '전체 그룹' : ''}
              </p>
            </li>
            <li className="list-type4-item__category">
              <p className="list-type4-item__text">{props.categoryName}</p>
            </li>
            {userInfo.userId === props.owner?.userId ? (
              <ShareItem {...props} />
            ) : (
              <li className="list-type4-item__share-filter">
                <div className="select__section select-type1-small">
                  <button className="select__label pointer-events-none">
                    <span className="select__label-text">{props?.shareCodeNm}</span>
                  </button>
                </div>
              </li>
            )}
            <OwnerItem
              id={props.newsSrchId || 0}
              title={props.title || ''}
              keyString={'monitoringId'}
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
                settingList={props.settingList}
                setIsOption={i => setIsOption(i)}
                tableDropDownAction={(i, k) => setOtherActions(i, props, categoryTotalList)}
              />
            </li>
          </ul>
        </div>
      </a>
    </li>
  )
}

export default ContentItem
