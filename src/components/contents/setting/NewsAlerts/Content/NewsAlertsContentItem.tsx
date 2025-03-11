import { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'

import Button from '~/components/common/ui/Button'
import Flag from '~/components/common/ui/Flag'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import { defaultDayMap, defaultNewsAlertsButtonList } from '~/components/contents/setting/NewsAlerts/defaultData'
import {
  newsAlertsDeletePopupAction,
  setCurrentNewsSrchId,
  setNewsAlertsPopupAction,
} from '~/stores/modules/contents/newsAlert/newsAlert'
import { NewsAlertListDto } from '~/types/api/service'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'
import { useNewsAlertsList } from '~/utils/hooks/contents/setting/useNewsAlertsList'

interface Props {
  data: NewsAlertListDto
}

const NewsAlertsContentItem = ({ data }: Props) => {
  const dispatch = useAppDispatch()
  const { openUserProfilePopupAction } = useNewsAlertsList()

  const [isOption, setIsOption] = useState(false)
  const OptionIdOpenRef = useRef<HTMLTableRowElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleOptionClick = useCallback(
    (e: MouseEvent) => {
      if (OptionIdOpenRef.current && !OptionIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  const handleMoreButton = async (id: string) => {
    switch (id) {
      case 'edit': // 수정하기
        dispatch(setCurrentNewsSrchId(data.newsSrchId || 0))
        setTimeout(
          () =>
            dispatch(
              setNewsAlertsPopupAction({
                isOpen: true,
              })
            ),
          50
        )
        break
      case 'delete': // 삭제하기
        dispatch(
          newsAlertsDeletePopupAction({
            isOpen: true,
            alertId: data.alertId || 0,
            newsSrchName: data.newsSrchName || '',
          })
        )
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', e => handleOptionClick(e))
    return () => window.removeEventListener('mousedown', e => handleOptionClick(e))
  }, [])

  const scheduleByDay = []
  if (data?.schedule?.scheduleByDay) {
    for (const [day, times] of Object.entries(data.schedule.scheduleByDay)) {
      if (times.length > 0) {
        const koreanDay = defaultDayMap[day as keyof typeof defaultDayMap]
        const formattedTime = times
        scheduleByDay.push(`${koreanDay}: ${formattedTime}`)
      }
    }
  }
  return (
    <tr
      key={data.alertId}
      ref={OptionIdOpenRef}
    >
      <td>
        <Button
          label={data.newsSrchName || ''}
          cate={'link-text'}
          size={'m'}
          color={'body-link'}
          elem="a"
          url={`/news/monitoring?monitoring_id=${data.newsSrchId}`}
        />
      </td>
      <td style={{ whiteSpace: 'pre-line' }}>
        {scheduleByDay.length > 0 ? scheduleByDay.join('\n').replaceAll(',', ', ') : '-'}
      </td>
      <td>
        {data?.expireAt ? (
          <>
            {moment(data.expireAt).format('YYYY-MM-DD')}{' '}
            {moment(moment(data.expireAt).format('YYYY-MM-DD')).isBefore(moment().format('YYYY-MM-DD')) && (
              <Flag
                label={'종료'}
                color={'gray-500'}
                size={'es'}
              />
            )}
          </>
        ) : (
          '-'
        )}
      </td>
      <td>{data?.regisAt ? moment(data.regisAt).format('YYYY-MM-DD') : '-'}</td>
      <td>
        <Button
          label={data.ownerName || ''}
          cate={'link-text'}
          size={'m'}
          color={'body-link'}
          onClick={() => openUserProfilePopupAction(data.ownerId || 0)}
        />
      </td>
      <td>{data.newsAlertCount}</td>
      <td>
        <TableDropDownItem
          isOption={isOption}
          settingList={defaultNewsAlertsButtonList}
          setIsOption={() => setIsOption(!isOption)}
          tableDropDownAction={(i, k) => {
            handleMoreButton(i.id)
          }}
        />
      </td>
    </tr>
  )
}

export default NewsAlertsContentItem
