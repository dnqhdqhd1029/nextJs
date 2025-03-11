import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import OwnerItem from '~/components/common/ui/OwnerItem'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import ShareItem from '~/components/contents/monitoring/Clipbook/Search/Content/ShareItem'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { UserDtoForGroup } from '~/types/api/service'
import { getDateFormat } from '~/utils/common/date'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const ContentItem = (props: clipbookContentListProps) => {
  const router = useRouter()
  const {
    userInfo,
    searchContentKeyList,
    timeZone,
    ownerGroup,
    setSearchContentKeyList,
    ownerFunction,
    setOtherActions,
    onMoveUrlClickCheck,
    getOwnerLayer,
    setOwnerPopupAction,
  } = useMonitoringClipbookSearch()
  const [isOption, setIsOption] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const activityOpenRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (activityOpenRef.current && !activityOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    const find = searchContentKeyList.find(e => (e?.clipBookId || '').toString() === props.clipBookId?.toString())
    setIsChecked(() => !!find)
  }, [searchContentKeyList])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <li
      onClick={e => {
        props.clipBookId && onMoveUrlClickCheck(e.target as HTMLElement, props.clipBookId)
        e.preventDefault()
      }}
    >
      <a
        href={`/news/clipbook-result?clipbook_id=${props.clipBookId}`}
        onClick={e => e.preventDefault()}
      >
        <div
          className={'list-type4-item__section'}
          id={props.clipBookId?.toString() || ''}
          ref={activityOpenRef}
        >
          <ul className="list-type4-item__list">
            <li
              className="list-type4-item__check"
              onClick={e => {
                props.clipBookId && setSearchContentKeyList(!isChecked, props, searchContentKeyList)
                e.preventDefault()
              }}
            >
              <FormInputBtn
                type="checkbox"
                name={'search-result__header-sort props.clipBookId' + props.clipBookId?.toString() || ''}
                id={'search-result__header-sort props.clipBookId' + props.clipBookId?.toString() || ''}
                checked={isChecked}
                label=""
                //onChange={e => props.jrnlstListId && setSearchContentKeyList(e, props, searchContentKeyList)}
              />
            </li>
            <li
              className="list-type4-item__title type-flex-grow"
              onClick={e => {
                router.push(`/news/clipbook-result?clipbook_id=${props.clipBookId}`)
                e.preventDefault()
              }}
            >
              <p className="list-type4-item__text">
                <span>{props.title}</span>
                {props.isOwner && <IcoSvg data={icoSvgData.personLineBroken} />}
              </p>
            </li>
            <li className="list-type4-item__category">
              <p className="list-type4-item__text">뉴스 {props.newslist?.length ?? 0}개</p>
            </li>
            <li className="list-type4-item__group">
              <p className="list-type4-item__text">{props.type === 'COVERAGE' ? '커버리지' : '일반'}</p>
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
              id={props.clipBookId || 0}
              title={props.title || ''}
              keyString={'clipBookId'}
              type={props.type || ''}
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
                    ? getDateFormat(timeZone, props?.regisAt || '')
                    : getDateFormat(timeZone, props?.updateAt || '')}
                </p>
              </div>
            </li>
            <li className="list-type4-item__more">
              <TableDropDownItem
                isOption={isOption}
                mainTitle={'설정'}
                itemProps={props}
                settingList={props.settingList}
                setIsOption={i => setIsOption(() => i)}
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
