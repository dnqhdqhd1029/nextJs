import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import { extendedShareScopeList } from '~/components/contents/pressMedia/SearchManagement/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const MediaAllPressContentShareCode = () => {
  const {
    contentAllShareCodePopup,
    setContentAllShareCodePopup,
    setContentAllShareCodePopupOnChange,
    selectedAllShareCodeAction,
  } = useMediaListManagement()
  const [isLoading, setIsLoading] = useState(false)

  const shareAction = async () => {
    setIsLoading(() => true)
    await selectedAllShareCodeAction(contentAllShareCodePopup.scrop, contentAllShareCodePopup)
    setIsLoading(() => false)
  }
  return (
    <>
      <Popup
        isOpen={contentAllShareCodePopup.isOpen}
        onClose={() => setContentAllShareCodePopup()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'공유 설정 수정'}
        width={500}
        height={400}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'수정'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => shareAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={isLoading}
              color={'link-dark'}
              onClick={() => setContentAllShareCodePopup()}
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <ul className="interval-mt14">
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'공유 설정'} />
                <Select
                  options={extendedShareScopeList}
                  onChange={(option: SelectListOptionItem) =>
                    setContentAllShareCodePopupOnChange(option, contentAllShareCodePopup)
                  }
                  value={contentAllShareCodePopup.scrop}
                />
              </div>
            </li>
          </ul>
        </div>
      </Popup>
    </>
  )
}

export default MediaAllPressContentShareCode
