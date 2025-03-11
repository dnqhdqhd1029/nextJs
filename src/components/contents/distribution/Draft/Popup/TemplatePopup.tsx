import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { openToast } from '~/utils/common/toast'

const TemplatePopup = ({
  isLoading,
  onClose,
  onCreate,
}: {
  isLoading: boolean
  onClose: () => void
  onCreate: (template_title: string) => void
}) => {
  const [title, setTitle] = useState<string>('')

  const handleChangeTitle = (value: string) => setTitle(value)

  const handleCreate = () => {
    if (!!!title.trim()) {
      openToast('템플릿 제목을 입력해주세요', 'error')
    } else {
      onCreate(title)
    }
  }
  return (
    <>
      <Popup
        width={500}
        isOpen={true}
        hasCloseButtonLoading={isLoading}
        onClose={onClose}
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
              onClick={handleCreate}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={onClose}
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
                onChange={e => handleChangeTitle(e.target.value)}
                value={title}
              />
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default TemplatePopup
