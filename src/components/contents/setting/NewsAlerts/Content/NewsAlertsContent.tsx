import { useCallback, useEffect, useRef, useState } from 'react'

import NewsAlertsContentItem from '~/components/contents/setting/NewsAlerts/Content/NewsAlertsContentItem'
import { NewsAlertListDto, UserDtoForGroup } from '~/types/api/service'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useNewsAlertsList } from '~/utils/hooks/contents/setting/useNewsAlertsList'

interface Props {
  data: NewsAlertListDto[]
}

const NewsAlertsContent = ({ data }: Props) => {
  const { userSelectGroup } = useAppSelector(state => state.authSlice)
  const refineValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const { openUserProfilePopupAction } = useNewsAlertsList()

  const [isOption, setIsOption] = useState(false)
  const OptionIdOpenRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ownerGroup, setOwnerGroup] = useState<Array<UserDtoForGroup>>([])

  const handleOptionClick = useCallback(
    (e: MouseEvent) => {
      if (OptionIdOpenRef.current && !OptionIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleOptionClick(e))
    return () => window.removeEventListener('mousedown', e => handleOptionClick(e))
  }, [])

  return (
    <li>
      <div className="setting-contents-list__section type-table">
        <div className="table-type4__section">
          <table>
            <caption>caption</caption>
            <thead>
              <tr>
                <th scope="col">모니터링 이름</th>
                <th scope="col">내 수신 시간</th>
                <th scope="col">종료일</th>
                <th scope="col">설정일</th>
                <th scope="col">소유자</th>
                <th scope="col">수신자</th>
                <th scope="col">관리</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                return (
                  <NewsAlertsContentItem
                    key={item.alertId}
                    data={item}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </li>
  )
}

export default NewsAlertsContent
