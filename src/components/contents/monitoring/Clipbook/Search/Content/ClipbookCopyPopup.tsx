import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import { extendedShareScopeList } from '~/components/contents/monitoring/Clipbook/Search/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const ClipbookCopyPopup = () => {
  const {
    clipbookListParams,
    licenseInfo,
    clipbookCopyPopup,
    setInitClipbookCopyPopup,
    setClipbookCopyPopupTitleOnChange,
    setClipbookCopyPopupHandleCategory,
    setClipbookCopyPopupHandleShareSetting,
    selectedCopyAction,
  } = useMonitoringClipbookSearch()
  const [isLoading, setIsLoading] = useState(false)

  const deleteAction = async () => {
    setIsLoading(() => true)
    await selectedCopyAction(clipbookCopyPopup, clipbookListParams)
    setIsLoading(() => false)
  }
  return (
    <>
      <Popup
        isOpen={clipbookCopyPopup.isOpen}
        onClose={() => setInitClipbookCopyPopup()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'클립북 복사'}
        width={500}
        // height={500}
        className="popup-none-scroll"
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'복사'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => deleteAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={isLoading}
              color={'link-dark'}
              onClick={() => setInitClipbookCopyPopup()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        <ul>
          <li>
            <FormTitle
              title={'복사할 클립북 이름'}
              required={true}
            />
            <FormInputText
              required={true}
              onChange={e => setClipbookCopyPopupTitleOnChange(e.target.value, clipbookCopyPopup)}
              failed={clipbookCopyPopup.nameErr !== ''}
              msg={clipbookCopyPopup.nameErr}
              value={clipbookCopyPopup.name}
            />
          </li>
          {licenseInfo.flagGroup && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle
                  title={'복사할 그룹'}
                  required={true}
                />
                <Select
                  options={clipbookCopyPopup.categoryList}
                  onChange={(option: SelectListOptionItem) =>
                    setClipbookCopyPopupHandleCategory(option, clipbookCopyPopup)
                  }
                  value={clipbookCopyPopup.category}
                />
              </div>
            </li>
          )}
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle
                title={'공유 설정'}
                required={true}
              />
              <Select
                options={extendedShareScopeList}
                onChange={(option: SelectListOptionItem) =>
                  setClipbookCopyPopupHandleShareSetting(option, clipbookCopyPopup)
                }
                value={clipbookCopyPopup.scrop}
              />
            </div>
          </li>
        </ul>
        {/* </div> */}
      </Popup>
    </>
  )
}

export default ClipbookCopyPopup
