import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const TemplateChangePopup = () => {
  const { isChangeTemplate, initTemplateChange, templateChangeAction } = usePressRelese()
  const [isLoading, setIsLoading] = useState(false)

  const action = async () => {
    setIsLoading(() => true)
    await templateChangeAction(isChangeTemplate.key, isChangeTemplate.contents)
    setIsLoading(() => false)
  }
  return (
    <>
      <Popup
        isOpen={isChangeTemplate.isOpen}
        onClose={() => initTemplateChange()}
        hasCloseButtonLoading={isLoading}
        hasCloseButton
        title={'템플릿 변경'}
        width={600}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'변경'}
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
              onClick={() => initTemplateChange()}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p
            className="font-body__regular"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            템플릿을 변경하면 입력한 모든 내용이 삭제되고 새 템플릿으로 내용이 교체됩니다.
            <br />
            그래도 변경하겠습니까?
          </p>
        </div>
      </Popup>
    </>
  )
}

export default TemplateChangePopup
