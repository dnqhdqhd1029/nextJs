import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'
import { useAdminGroup } from '~/utils/hooks/contents/admin/useAdminGroup'

const EditGroupNmPopup = () => {
  const { userPopup, requestSearchParams, initUserProfilePopupActionChange, setGroupNmAction, editGroupCheckAction } =
    useAdminGroup()
  const [isLoading, setIsLoading] = useState(false)

  const editGroup = async () => {
    setIsLoading(() => true)
    await editGroupCheckAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }
  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'nameChange'}
      title={'그룹명 수정'}
      onClose={() => initUserProfilePopupActionChange()}
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
            onClick={() => initUserProfilePopupActionChange()}
          />
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => editGroup()}
          />
        </div>
      }
    >
      <ul>
        <li>
          <FormInputText
            title={'그룹명'}
            required={true}
            value={userPopup.groupNm}
            onChange={e => setGroupNmAction(e.target.value, userPopup)}
            failed={userPopup.groupNmErr !== ''}
            msg={userPopup.groupNmErr}
          />
        </li>
      </ul>
    </Popup>
  )
}

export default EditGroupNmPopup
