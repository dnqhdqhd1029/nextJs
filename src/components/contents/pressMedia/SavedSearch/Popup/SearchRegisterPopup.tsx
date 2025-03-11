import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const SearchRegisterPopup = () => {
  const {
    isFilterSubParam,
    pressSearchOptionParams,
    isOwner,
    mediaSearchOptionParams,
    searchRegisterPopup,
    setInitSearchRegisterPopup,
    setSearchRegisterPopupOnChange,
    searchPressRegisterAction,
    searchMediaRegisterAction,
  } = useSavedSearch()
  const [isLoading, setIsLoading] = useState(false)

  const setAction = async () => {
    setIsLoading(() => true)
    searchRegisterPopup.type === 'press'
      ? await searchPressRegisterAction(searchRegisterPopup, pressSearchOptionParams, isOwner, isFilterSubParam)
      : await searchMediaRegisterAction(searchRegisterPopup, mediaSearchOptionParams, isOwner, isFilterSubParam)
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])
  return (
    <>
      <Popup
        isOpen={searchRegisterPopup.isOpen}
        onClose={() => setInitSearchRegisterPopup()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'맞춤 검색 만들기'}
        width={600}
        //height={600}
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
              onClick={() => setInitSearchRegisterPopup()}
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

export default SearchRegisterPopup
