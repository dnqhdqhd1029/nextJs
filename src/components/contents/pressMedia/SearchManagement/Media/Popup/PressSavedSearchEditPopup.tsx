import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import {
  extendedShareScopeList,
  extendedShareScopeTargetList,
} from '~/components/contents/pressMedia/SearchManagement/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { usePressSavedSearchManagement } from '~/utils/hooks/contents/pressMedia/usePressSavedSearchManagement'

const PressSavedSearchEditPopup = () => {
  const {
    savedSearchPopup,
    setSavedSearchPopupTitleOnChange,
    setSavedSearchPopupSelectedUserChange,
    setSavedSearchPopupTargetShareSettingOnChange,
    setSavedSearchPopupShareSettingOnChange,
    setInitSavedSearchPopupAction,
    checkValidation,
    updateSavedSearch,
  } = usePressSavedSearchManagement()
  const [isLoading, setIsLoading] = useState(false)

  const setAction = async () => {
    setIsLoading(() => true)
    const check = await checkValidation(savedSearchPopup)
    if (check) {
      await updateSavedSearch(savedSearchPopup)
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    console.log('savedSearchPopup', savedSearchPopup)
  }, [])
  return (
    <>
      <Popup
        isOpen={savedSearchPopup.isOpen}
        onClose={() => setInitSavedSearchPopupAction()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'언론인 맞춤 검색 수정'}
        width={600}
        height={600}
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
        <div className="popup-contents__section">
          <ul className="interval-mt14">
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
                  value={savedSearchPopup.selectedUser}
                  disabled={!savedSearchPopup.isOwner}
                />
              </div>
            </li>
          </ul>
        </div>
      </Popup>
    </>
  )
}

export default PressSavedSearchEditPopup
