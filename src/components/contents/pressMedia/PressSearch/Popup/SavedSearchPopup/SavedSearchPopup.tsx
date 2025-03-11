import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const SavedSearchPopup = () => {
  const {
    pressMediaListOption,
    searchRegisterPopup,
    pressSearchOption,
    setSearchRegisterPopupOnChange,
    setSearchRegisterPopup,
    searchPressRegisterAction,
  } = usePressSearchOptions()
  const [isLoading, setIsLoading] = useState(false)

  const setAction = async () => {
    setIsLoading(() => true)
    await searchPressRegisterAction(searchRegisterPopup, pressSearchOption, pressMediaListOption)
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={searchRegisterPopup.isOpen}
        onClose={() => setSearchRegisterPopup(false, '')}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'맞춤 검색 만들기'}
        width={500}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'저장'}
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
              onClick={() => setSearchRegisterPopup(false, '')}
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <ul className="interval-mt14">
            <li>
              <FormTitle
                title={'제목'}
                required={true}
              />
              <FormInputText
                required={true}
                onChange={e => setSearchRegisterPopupOnChange(e.target.value, searchRegisterPopup)}
                failed={searchRegisterPopup.titleErr !== ''}
                msg={searchRegisterPopup.titleErr}
                value={searchRegisterPopup.title}
              />
            </li>
          </ul>
        </div>
      </Popup>
    </>
  )
}

export default SavedSearchPopup
