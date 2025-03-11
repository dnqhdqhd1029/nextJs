import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const TemplateDeletePopup = () => {
  const { isDeleteTemplate, initTemplateDelete, templateDeleteAction } = usePressRelese()
  const [isLoading, setIsLoading] = useState(false)

  const action = async () => {
    setIsLoading(() => true)
    await templateDeleteAction(isDeleteTemplate.key)
    setIsLoading(() => false)
  }
  return (
    <>
      <Popup
        isOpen={isDeleteTemplate.isOpen}
        onClose={() => initTemplateDelete()}
        hasCloseButtonLoading={isLoading}
        hasCloseButton
        title={'템플릿 삭제'}
        width={600}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'삭제'}
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
              onClick={() => initTemplateDelete()}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p
            className="font-body__regular"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            이 템플릿을 삭제하겠습니까?
          </p>
        </div>
      </Popup>
    </>
  )
}

export default TemplateDeletePopup
