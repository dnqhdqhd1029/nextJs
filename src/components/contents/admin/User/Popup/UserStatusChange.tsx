import { useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { defaultPermissionList, defaultStatusList } from '~/components/contents/admin/defaultData'
import { useAdminUser } from '~/utils/hooks/contents/admin/useAdminUser'

const UserStatusChange = () => {
  const {
    userPopup,
    settingsRefinedValue,
    requestSearchParams,
    setCloseUserPopup,
    setUserStatusAction,
    changeUserStatusAction,
  } = useAdminUser()
  const [isLoading, setIsLoading] = useState(false)

  const changeUserStatus = async () => {
    setIsLoading(() => true)
    await changeUserStatusAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }

  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'status'}
      title={'회원 상태 변경'}
      onClose={() => setCloseUserPopup()}
      width={500}
      hasCloseButton
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            disabled={isLoading}
            onClick={() => setCloseUserPopup()}
          />
          <Button
            label={'확인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => changeUserStatus()}
          />
        </div>
      }
    >
      <ul>
        <li>
          <div className="ipt-text__area">
            <FormTitle title="이름" />
            <p className="ipt-text-readonly">
              <span className="fw400">{userPopup.name}</span>
            </p>
          </div>
        </li>
        <li>
          <div className="ipt-text__area">
            <FormTitle title="이메일" />
            <p className="ipt-text-readonly">
              <span className="fw400">{userPopup.email}</span>
            </p>
          </div>
        </li>
        <li>
          <div className="ipt-btn__section">
            <FormTitle
              title="상태"
              required={true}
            />
            <ul className="ipt-btn__list--row">
              {defaultStatusList.map((e, i) => (
                <li key={'editUser.auth' + i.toString()}>
                  <FormBasicRadio
                    label={e.name}
                    name={'editUser.auth' + e.id.toString()}
                    id={'editUser.auth' + e.id.toString()}
                    checked={userPopup.userStatus === e.id}
                    onChange={() => setUserStatusAction(e.id, userPopup)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="ipt-text__area type-pb6">
            <p className="font-body__regular">
              회원 상태는 1년 간 {parseInt(settingsRefinedValue['max_status_change'])}회까지 바꿀 수 있습니다.
              <br />
              회원을 비활성화 해도 회원이 만든 컨텐츠와 활동 기록은 그대로 남게 됩니다.
            </p>
          </div>
        </li>
      </ul>
    </Popup>
  )
}

export default UserStatusChange
