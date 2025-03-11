import { useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { TemplateWarningMsg } from '~/components/contents/distribution/Release/Press/TemplateStep/Warning'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const TemplatePopup = () => {
  const {
    templateRegisterPopup,
    templatePopupInputChange,
    iinitTemplatePopupAction,
    templatePopupConfirmAction,
    setIsAddTemplate,
  } = usePressRelese()
  const refineValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const [isLoading, setIsLoading] = useState(false)

  const action = async () => {
    setIsLoading(() => true)
    await templatePopupConfirmAction(
      templateRegisterPopup,
      <TemplateWarningMsg templateCount={parseInt(refineValue['max_template_number'] ?? '20')} />
    )
    await setIsAddTemplate(true)
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        width={500}
        isOpen={templateRegisterPopup.isOpen}
        hasCloseButtonLoading={isLoading}
        onClose={() => iinitTemplatePopupAction({ isOpen: false, key: 0, content: '', valueErr: '', value: '' })}
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
              onClick={() => iinitTemplatePopupAction({ isOpen: false, key: 0, content: '', valueErr: '', value: '' })}
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
                onChange={e => templatePopupInputChange(e.target.value, templateRegisterPopup)}
                failed={templateRegisterPopup.valueErr !== ''}
                msg={templateRegisterPopup.valueErr}
                value={templateRegisterPopup.value}
              />
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default TemplatePopup
