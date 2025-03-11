import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import { IcoPersonLineBroken } from '~/components/common/ui/IcoGroup'
import Tooltips from '~/components/common/ui/Tooltips'
import { defaultGroupSettingLayerItems } from '~/components/contents/admin/defaultData'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import { USER_ROLE_CODE, USER_STATE_CODE } from '~/constants/common/user'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { getDateFormat } from '~/utils/common/date'
import { useAdminGroup } from '~/utils/hooks/contents/admin/useAdminGroup'

const GroupListTable = (props: GroupDto) => {
  const { timeZone, currentGroup, setGroupNmChangePopupAction, setUserProfilePopupAction, checkOutGroup } =
    useAdminGroup()
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

  const filteredUsers = (props?.users ?? []).filter(
    i => i.stateCode !== USER_STATE_CODE.UNCERTIFIED && i.stateCode !== USER_STATE_CODE.INACTIVE
  )

  return (
    <tr
      key={'userList' + props.groupId}
      ref={activityOpenRef}
    >
      <td>
        <div className="td-container">
          <Button
            label={props?.name || '-'}
            cate={'link-text'}
            size={'m'}
            color={'body-link'}
            onClick={() => checkOutGroup(props, currentGroup)}
          />
        </div>
      </td>
      <td>
        <div className="td-container">{filteredUsers.length}</div>
      </td>
      <td>
        <div className="td-container">
          <ul className="d-link__list type-tooltip">
            {filteredUsers.length > 0 ? (
              <>
                {filteredUsers.map(i => (
                  <li key={'d-link__list type-tooltip' + uuid() + i.stateCode}>
                    {i.stateCode === USER_STATE_CODE.UNCERTIFIED && (
                      <Tooltips
                        tooltipId={i.userId?.toString() ?? uuid()}
                        tooltipPlace={'top'}
                        tooltipHtml={'미인증 회원'}
                        tooltipContents={i.email ?? ''}
                        aTagClassName="disabled color-disabled cursor-default"
                      />
                    )}
                    {i.stateCode === USER_STATE_CODE.INACTIVE && (
                      <Tooltips
                        tooltipId={i.userId?.toString() ?? uuid()}
                        tooltipPlace={'top'}
                        tooltipHtml={'비활성'}
                        tooltipComponent={
                          <Button
                            elem="button"
                            label={i ? (i.name && i.name !== '' ? i.name : '-') : '-'}
                            cate={'link-text'}
                            size={'m'}
                            color={'gray-500'}
                            onClick={() => setUserProfilePopupAction(true, i.userId ? Number(i?.userId) : 0, 'status')}
                          />
                        }
                        aTagClassName="disabled color-disabled cursor-default"
                      />
                    )}
                    {i.stateCode === USER_STATE_CODE.ACTIVE && (
                      <>
                        <Button
                          elem="button"
                          label={i ? (i.name && i.name !== '' ? i.name : '-') : '-'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => setUserProfilePopupAction(true, i.userId ? Number(i?.userId) : 0, 'status')}
                        />
                        {i.role === USER_ROLE_CODE.ADMIN && (
                          <Tooltips
                            tooltipId={i.userId?.toString() ?? uuid()}
                            tooltipPlace={'top'}
                            tooltipHtml={'관리자'}
                            tooltipComponent={<IcoPersonLineBroken />}
                          />
                        )}
                      </>
                    )}
                  </li>
                ))}
              </>
            ) : (
              <li>-</li>
            )}
          </ul>
        </div>
      </td>
      <td>
        <div className="td-container">
          <Button
            elem="button"
            label={
              props.register ? (props.register.name && props.register.name !== '' ? props.register.name : '-') : '-'
            }
            cate={'link-text'}
            size={'m'}
            color={'body-link'}
            disabled={props.register ? props.register.stateCode !== USER_STATE_CODE.ACTIVE : false}
            onClick={() =>
              setUserProfilePopupAction(true, props?.register?.userId ? Number(props?.register?.userId) : 0, 'status')
            }
          />
        </div>
      </td>
      <td>
        <div className="td-container">{props.regisAt && getDateFormat(timeZone, props.regisAt, false, true)}</div>
      </td>
      <td>
        <div className="td-container">
          <TableDropDownItem
            isOption={isOption}
            settingList={defaultGroupSettingLayerItems}
            setIsOption={i => setIsOption(i)}
            tableDropDownAction={(i, k) => setGroupNmChangePopupAction(i.id === 'delete', props, i.id)}
          />
        </div>
      </td>
    </tr>
  )
}

export default GroupListTable
