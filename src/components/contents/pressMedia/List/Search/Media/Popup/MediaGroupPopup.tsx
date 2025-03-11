import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import { extendedShareScopeList } from '~/components/contents/pressMedia/SearchManagement/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const MediaGroupPopup = () => {
  const {
    userInfo,
    mediaGroupPopup,
    setMediaGroupPopupTitleOnChange,
    setMediaGroupPopupSelectedUserChange,
    setMediaGroupPopupGroupTargetOnChange,
    setMediaGroupPopupShareSettingOnChange,
    setInitMediaGroupPopupAction,
    setMediaGroupPopupDefaultChecked,
    checkValidation,
    mediaGroupAction,
  } = useMediaListManagement()
  const [isLoading, setIsLoading] = useState(false)

  const setAction = async () => {
    setIsLoading(() => true)
    const check = await checkValidation(mediaGroupPopup)
    if (check) {
      await mediaGroupAction(mediaGroupPopup)
    }
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={mediaGroupPopup.isOpen}
        onClose={() => setInitMediaGroupPopupAction()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={mediaGroupPopup.title}
        width={500}
        // height={600}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={mediaGroupPopup.confirmText}
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
              onClick={() => setInitMediaGroupPopupAction()}
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
              onChange={e => setMediaGroupPopupTitleOnChange(e.target.value, mediaGroupPopup)}
              failed={mediaGroupPopup.nameErr !== ''}
              msg={mediaGroupPopup.nameErr}
              value={mediaGroupPopup.name}
            />
          </li>
          {mediaGroupPopup.type === 'copy' && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'복사할 그룹'} />
                <Select
                  options={mediaGroupPopup.groupList}
                  onChange={(option: SelectListOptionItem) =>
                    setMediaGroupPopupGroupTargetOnChange(option, mediaGroupPopup)
                  }
                  value={mediaGroupPopup.targetGroup}
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
                  setMediaGroupPopupShareSettingOnChange(option, mediaGroupPopup)
                }
                value={mediaGroupPopup.scrop}
                disabled={!mediaGroupPopup.isOwner}
              />
            </div>
          </li>
          {mediaGroupPopup.type === 'create' && (
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
                        setMediaGroupPopupDefaultChecked(!mediaGroupPopup.isDefaultChecked, mediaGroupPopup)
                      }
                      checked={mediaGroupPopup.isDefaultChecked}
                    />
                  </li>
                </ul>
              </div>
            </li>
          )}
          {mediaGroupPopup.type === 'edit' && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'소유자'} />
                <Select
                  options={mediaGroupPopup.userList}
                  onChange={(option: SelectListOptionItem) =>
                    setMediaGroupPopupSelectedUserChange(option, mediaGroupPopup)
                  }
                  msg={
                    !mediaGroupPopup.isOwner
                      ? ''
                      : userInfo &&
                        userInfo?.userId &&
                        mediaGroupPopup?.selectedUser?.id !== userInfo?.userId.toString()
                      ? '공유 권한 설정에 따라 맞춤 검색에 접근하지 못할 수 있습니다.'
                      : ''
                  }
                  value={mediaGroupPopup.selectedUser}
                  disabled={!mediaGroupPopup.isOwner}
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

export default MediaGroupPopup
