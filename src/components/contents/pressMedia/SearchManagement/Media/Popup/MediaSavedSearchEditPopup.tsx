import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import {
  extendedShareScopeList,
  extendedShareScopeTargetList,
} from '~/components/contents/pressMedia/SearchManagement/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { useMediaSavedSearchManagement } from '~/utils/hooks/contents/pressMedia/useMediaSavedSearchManagement'

const MediaSavedSearchEditPopup = () => {
  const {
    userInfo,
    savedSearchPopup,
    setSavedSearchPopupTitleOnChange,
    setSavedSearchPopupSelectedUserChange,
    setSavedSearchPopupTargetShareSettingOnChange,
    setSavedSearchPopupShareSettingOnChange,
    setInitSavedSearchPopupAction,
    checkValidation,
    updateSavedSearch,
  } = useMediaSavedSearchManagement()
  const [isLoading, setIsLoading] = useState(false)

  const setAction = async () => {
    setIsLoading(() => true)
    const check = await checkValidation(savedSearchPopup)
    if (check) {
      await updateSavedSearch(savedSearchPopup)
    }
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={savedSearchPopup.isOpen}
        onClose={() => setInitSavedSearchPopupAction()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'미디어 맞춤 검색 수정'}
        width={500}
        // height={600}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'수정'}
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
              onClick={() => setInitSavedSearchPopupAction()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        {/* <ul className="interval-mt14"> */}
        <ul>
          <li>
            <FormTitle
              title={'맞춤 검색명'}
              required={true}
            />
            <FormInputText
              required={true}
              onChange={e => setSavedSearchPopupTitleOnChange(e.target.value, savedSearchPopup)}
              failed={savedSearchPopup.nameErr !== ''}
              msg={savedSearchPopup.nameErr}
              value={savedSearchPopup.name}
            />
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'공유 설정'} />
              <Select
                options={extendedShareScopeList}
                onChange={(option: SelectListOptionItem) =>
                  setSavedSearchPopupShareSettingOnChange(option, savedSearchPopup)
                }
                value={savedSearchPopup.scrop}
                disabled={!savedSearchPopup.isOwner}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'공유 대상'} />
              <Select
                options={extendedShareScopeTargetList}
                onChange={(option: SelectListOptionItem) =>
                  setSavedSearchPopupTargetShareSettingOnChange(option, savedSearchPopup)
                }
                value={savedSearchPopup.scropTarget}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'소유자'} />
              <Select
                options={savedSearchPopup.userList}
                onChange={(option: SelectListOptionItem) =>
                  setSavedSearchPopupSelectedUserChange(option, savedSearchPopup)
                }
                msg={
                  !savedSearchPopup.isOwner
                    ? ''
                    : userInfo && userInfo?.userId && savedSearchPopup?.selectedUser?.id !== userInfo?.userId.toString()
                    ? '공유 권한 설정에 따라 맞춤 검색에 접근하지 못할 수 있습니다.'
                    : ''
                }
                value={savedSearchPopup.selectedUser}
                disabled={!savedSearchPopup.isOwner}
              />
            </div>
          </li>
        </ul>
        {/* </div> */}
      </Popup>
    </>
  )
}

export default MediaSavedSearchEditPopup
