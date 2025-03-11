import { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { defaultTagSettingList } from '~/components/contents/activity/tag/defaultData'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import { TagDto } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { openToast } from '~/utils/common/toast'
import { useTagActivity } from '~/utils/hooks/contents/activity/useTagActivity'

interface Props {
  item: TagDto
}

const ContentItem = (props: Props) => {
  const router = useRouter()
  const { openPopup, moveToSearch, onMoveUrlClickCheck } = useTagActivity()
  const [isOption, setIsOption] = useState(false)
  const [filterUrl, setFilterUrl] = useState('')
  const activityOpenRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (activityOpenRef.current && !activityOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  const checkUrl = async () => {
    if (props.item && props.item.tagId && filterUrl === '') {
      const res = await moveToSearch(props.item)
      setFilterUrl(() => res)
    }
  }

  useEffect(() => {
    checkUrl()
  }, [filterUrl])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <li
      id={'li' + props.item.tagId?.toString() || ''}
      onClick={e => {
        onMoveUrlClickCheck(e.target as HTMLElement, filterUrl, Number(props?.item?.count || 0))
        e.preventDefault()
      }}
    >
      <a
        href={`/activity/search?filter=${filterUrl}`}
        onClick={e => e.preventDefault()}
      >
        <div
          className={'list-type11-item__section'}
          id={props.item.tagId?.toString() || ''}
          ref={activityOpenRef}
        >
          <ul className="list-type11-item__list">
            <li
              className="list-type11-item__title type-flex-grow"
              onClick={e => {
                Number(props?.item?.count || 0) > 0
                  ? router.push(`/activity/search?filter=${filterUrl}`)
                  : openToast('태깅된 활동이 없습니다.', 'error')
                e.preventDefault()
              }}
            >
              <p className="list-type11-item__text">
                <span>{props.item.name}</span>
              </p>
            </li>
            <li className="list-type11-item__tagging">
              <p className="list-type11-item__text">활동 {props.item.count}개</p>
            </li>
            <li className="list-type11-item__history-user">
              <p className="list-type11-item__text">
                {props.item.updater?.displayName}{' '}
                {props.item?.count && props.item.count > 0 ? '태깅' : props.item.cuType === 'CREATE' ? '생성' : '수정'}
              </p>
            </li>
            <li className="list-type11-item__history-date">
              <p className="list-type11-item__text">{moment(props.item.cuDate).format('YYYY-MM-DD')}</p>
            </li>
            <li className="list-type11-item__more">
              <TableDropDownItem
                isOption={isOption}
                settingList={defaultTagSettingList}
                setIsOption={i => setIsOption(i)}
                tableDropDownAction={(i, k) =>
                  props.item.tagId && openPopup(i.id, props.item.tagId, props.item?.name || '')
                }
              />
            </li>
          </ul>
        </div>
      </a>
    </li>
  )
}

export default ContentItem
