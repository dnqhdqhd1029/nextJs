import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'
import { useAdminGroup } from '~/utils/hooks/contents/admin/useAdminGroup'

const GroupDeletePopup = () => {
  const { userPopup, requestSearchParams, initUserProfilePopupActionChange, setPassword, groupDeleteAction } =
    useAdminGroup()
  const [isLoading, setIsLoading] = useState(false)

  const groupDeleteCheck = async () => {
    setIsLoading(() => true)
    await groupDeleteAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }
  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'delete'}
      title={'그룹 삭제'}
      onClose={() => initUserProfilePopupActionChange()}
      width={550}
      hasCloseButton
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            disabled={isLoading}
            onClick={() => initUserProfilePopupActionChange()}
          />
          <Button
            label={'삭제'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => groupDeleteCheck()}
          />
        </div>
      }
    >
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular">
          "{userPopup.name}" 그룹을 삭제하시겠습니까?
          <br />
          <br />
          삭제하면 이 그룹에서 작성된 모든 정보가 삭제되며 복구할 수 없게 됩니다.
          <br />
          정말 삭제하려면 비밀번호 입력 후 삭제 버튼을 누르세요.
        </p>
      </div>
      <ul>
        <li>
          <FormInputText
            id="admin-passwd"
            name="admin-passwd"
            title="비밀번호"
            inputType="password"
            required={true}
            value={userPopup.password}
            onChange={e => setPassword(e.target.value, userPopup)}
            failed={userPopup.passwordErr !== ''}
            msg={userPopup.passwordErr}
            preventAutoComplete
          />
        </li>
      </ul>
    </Popup>
  )
}

export default GroupDeletePopup
