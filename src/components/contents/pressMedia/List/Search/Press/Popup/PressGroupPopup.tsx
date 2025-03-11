import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import {
  extendedShareScopeList,
  extendedShareScopeTargetList,
} from '~/components/contents/pressMedia/SearchManagement/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { usePressListManagement } from '~/utils/hooks/contents/pressMedia/usePressListManagement'
import { usePressSavedSearchManagement } from '~/utils/hooks/contents/pressMedia/usePressSavedSearchManagement'

const PressGroupPopup = () => {
  const {
    userInfo,
    pressGroupPopup,
    setPressGroupPopupTitleOnChange,
    setPressGroupPopupSelectedUserChange,
    setPressGroupPopupGroupTargetOnChange,
    setPressGroupPopupShareSettingOnChange,
    setInitPressGroupPopupAction,
    setPressGroupPopupDefaultChecked,
    checkValidation,
    pressGroupAction,
  } = usePressListManagement()
  const [isLoading, setIsLoading] = useState(false)

  const setAction = async () => {
    setIsLoading(() => true)
    const check = await checkValidation(pressGroupPopup)
    if (check) {
      await pressGroupAction(pressGroupPopup)
    }
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={pressGroupPopup.isOpen}
        onClose={() => setInitPressGroupPopupAction()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={pressGroupPopup.title}
        width={500}
        // height={600}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={pressGroupPopup.confirmText}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => setAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={isLoading}
              color={'link-dark'}
              onClick={() => setInitPressGroupPopupAction()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        {/* <ul className="interval-mt14"> */}
        <ul>
          <li>
            <FormTitle
              title={'리스트명'}
              required={true}
            />
            <FormInputText
              required={true}
              maxLength={100}
              onChange={e => setPressGroupPopupTitleOnChange(e.target.value, pressGroupPopup)}
              failed={pressGroupPopup.nameErr !== ''}
              msg={pressGroupPopup.nameErr}
              value={pressGroupPopup.name}
            />
          </li>
          {pressGroupPopup.type === 'copy' && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'복사할 그룹'} />
                <Select
                  options={pressGroupPopup.groupList}
                  onChange={(option: SelectListOptionItem) =>
                    setPressGroupPopupGroupTargetOnChange(option, pressGroupPopup)
                  }
                  value={pressGroupPopup.targetGroup}
                />
              </div>
            </li>
          )}
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'공유 설정'} />
              <Select
                options={extendedShareScopeList}
                onChange={(option: SelectListOptionItem) =>
                  setPressGroupPopupShareSettingOnChange(option, pressGroupPopup)
                }
                value={pressGroupPopup.scrop}
                disabled={!pressGroupPopup.isOwner}
              />
            </div>
          </li>
          {pressGroupPopup.type === 'create' && (
            <li>
              <div className="ipt-btn__section">
                <FormTitle title={'변경한 공유 설정을 목록 만들기에 기본값으로 사용하겠습니까?'} />
                <ul className="ipt-btn__list--row">
                  <li>
                    <FormBasicCheckbox
                      label={'기본값으로 사용'}
                      name={'clipbook-create_clipbookPopup'}
                      id={'clipbook-create_clipbookPopup'}
                      onChange={() =>
                        setPressGroupPopupDefaultChecked(!pressGroupPopup.isDefaultChecked, pressGroupPopup)
                      }
                      checked={pressGroupPopup.isDefaultChecked}
                    />
                  </li>
                </ul>
              </div>
            </li>
          )}
          {pressGroupPopup.type === 'edit' && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'소유자'} />
                <Select
                  options={pressGroupPopup.userList}
                  onChange={(option: SelectListOptionItem) =>
                    setPressGroupPopupSelectedUserChange(option, pressGroupPopup)
                  }
                  msg={
                    !pressGroupPopup.isOwner
                      ? ''
                      : userInfo &&
                        userInfo?.userId &&
                        pressGroupPopup?.selectedUser?.id !== userInfo?.userId.toString()
                      ? '공유 권한 설정에 따라 맞춤 검색에 접근하지 못할 수 있습니다.'
                      : ''
                  }
                  value={pressGroupPopup.selectedUser}
                  disabled={!pressGroupPopup.isOwner}
                />
              </div>
            </li>
          )}
        </ul>
        {/* </div> */}
      </Popup>
    </>
  )
}

export default PressGroupPopup
