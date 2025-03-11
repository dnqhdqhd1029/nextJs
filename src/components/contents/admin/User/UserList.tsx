import { useCallback, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import EmailLink from '~/components/common/ui/EmailLink'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import {
  defaultTableHeaderData,
  defaultUserSettingLayerItems,
  defaultUserSettingLayerItemsForUncertified,
} from '~/components/contents/admin/defaultData'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import { UserDto } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { getDateFormat } from '~/utils/common/date'
import { useAdminUser } from '~/utils/hooks/contents/admin/useAdminUser'

const UserList = (props: UserDto) => {
  const { setUserProfilePopupAction, timeZone } = useAdminUser()
  const activityOpenRef = useRef<HTMLTableRowElement>(null)
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

  return (
    <tr
      key={'userList' + props.email}
      ref={activityOpenRef}
    >
      <td>
        <div className="td-container">
          <Button
            label={props?.name || '-'}
            cate={'link-text'}
            size={'m'}
            color={'body-link'}
            onClick={() => setUserProfilePopupAction(true, props?.userId ? Number(props.userId) : 0, 'userProfile')}
          />
        </div>
      </td>
      <td>
        <div className="td-container">{props?.nickname || '-'}</div>
      </td>
      <td>
        <div className="td-container">
          <EmailLink email={props?.email || ''} />
        </div>
      </td>
      <td>
        <div className="td-container">{props.role === 'ADMIN' ? '관리자' : '사용자'}</div>
      </td>
      <td>
        <div className="td-container">
          {props.stateCode === 'ACTIVE'
            ? '활성'
            : props.stateCode === 'INACTIVE'
            ? '비활성'
            : props.stateCode === 'UNCERTIFIED'
            ? '미인증'
            : '잠김'}
        </div>
      </td>
      <td>
        <div className="td-container">{props.regisAt && getDateFormat(timeZone, props.regisAt, false, true)}</div>
      </td>
      <td>
        <div className="td-container">
          <TableDropDownItem
            isOption={isOption}
            settingList={
              props.stateCode !== 'UNCERTIFIED'
                ? defaultUserSettingLayerItems
                : defaultUserSettingLayerItemsForUncertified
            }
            setIsOption={() => setIsOption(!isOption)}
            tableDropDownAction={(i, k) =>
              setUserProfilePopupAction(false, props?.userId ? Number(props.userId) : 0, i.id)
            }
          />
        </div>
      </td>
    </tr>
  )
}

export default UserList
