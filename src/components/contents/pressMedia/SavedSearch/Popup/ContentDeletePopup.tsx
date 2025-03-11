import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const ContentDeletePopup = () => {
  const {
    contentDeletePopup,
    savedMediaKey,
    savedJournalKey,
    isOwner,
    setSelectedDeleteContent,
    selectedPressDeleteAction,
    selectedMediaDeleteAction,
  } = useSavedSearch()
  const [isLoading, setIsLoading] = useState(false)

  const deleteAction = async () => {
    setIsLoading(() => true)
    if (contentDeletePopup.type === 'press') {
      await selectedPressDeleteAction(contentDeletePopup, savedJournalKey, isOwner)
    } else {
      await selectedMediaDeleteAction(contentDeletePopup, savedMediaKey, isOwner)
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])
  return (
    <>
      <Popup
        isOpen={contentDeletePopup.isOpen}
        onClose={() => setSelectedDeleteContent({ isOpen: false, key: 0, title: '', type: '' })}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'삭제하기'}
        width={500}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'삭제'}
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
              onClick={() => setSelectedDeleteContent({ isOpen: false, key: 0, title: '', type: '' })}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            삭제하겠습니까?
            <br />
            삭제대상: {contentDeletePopup.title}
          </p>
        </div>
      </Popup>
    </>
  )
}

export default ContentDeletePopup
