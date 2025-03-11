import { useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'

const TemplatePopup = () => {
  const {
    templatePopup,
    templatePopupInputChange,
    inputTemplatePopupAction,
    templatePopupConfirmAction,
    templateValidation,
  } = useRecordActivity()
  const [isLoading, setIsLoading] = useState(false)

  const action = async () => {
    setIsLoading(() => true)
    const check = await templateValidation(templatePopup)
    if (check === '') {
      await templatePopupConfirmAction(templatePopup)
    }
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        width={500}
        isOpen={templatePopup.isOpen}
        hasCloseButtonLoading={isLoading}
        onClose={() => inputTemplatePopupAction()}
        hasCloseButton
        title={'템플릿으로 저장'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => action()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => inputTemplatePopupAction()}
            />
          </div>
        }
      >
        <ul>
          <li>
            <div className="form-social-media__section">
              <FormTitle
                title={'템플릿'}
                required={true}
              />
              <FormInputText
                required={true}
                maxLength={100}
                onChange={e => templatePopupInputChange(e.target.value, templatePopup)}
                failed={templatePopup.valueErr !== ''}
                msg={templatePopup.valueErr}
                value={templatePopup.value}
              />
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default TemplatePopup
