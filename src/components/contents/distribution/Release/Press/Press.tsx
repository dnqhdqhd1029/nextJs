import { useLayoutEffect } from 'react'

import { EmailWarningMsg } from '~/components/contents/common/email/Warning'
import DraftListNotification from '~/components/contents/distribution/common/Popup/DraftListNotification'
import ConfirmStep from '~/components/contents/distribution/Release/Press/ConfirmStep/ConfirmStep'
import ContentsStep from '~/components/contents/distribution/Release/Press/ContentsStep/ContentsStep'
import ContactInfoPopup from '~/components/contents/distribution/Release/Press/Popup/ContactInfoPopup'
import InputMediaPopup from '~/components/contents/distribution/Release/Press/Popup/InputMediaPopup'
import MediaPopup from '~/components/contents/distribution/Release/Press/Popup/MediaPopup'
import NoticePopup from '~/components/contents/distribution/Release/Press/Popup/NoticePopup'
import OutMessagePopup from '~/components/contents/distribution/Release/Press/Popup/OutMessagePopup'
import PreviewPopup from '~/components/contents/distribution/Release/Press/Popup/PreviewPopup'
import ReleasePopup from '~/components/contents/distribution/Release/Press/Popup/ReleasePopup'
import TemplateChangePopup from '~/components/contents/distribution/Release/Press/Popup/TemplateChangePopup'
import TemplateDeletePopup from '~/components/contents/distribution/Release/Press/Popup/TemplateDeletePopup'
import TemplatePopup from '~/components/contents/distribution/Release/Press/Popup/TemplatePopup'
import TestEmailSenderPopup from '~/components/contents/distribution/Release/Press/Popup/TestEmailSenderPopup'
import SettingStep from '~/components/contents/distribution/Release/Press/SettingStep/SettingStep'
import Steps from '~/components/contents/distribution/Release/Press/Step/Step'
import TemplateStep from '~/components/contents/distribution/Release/Press/TemplateStep/TemplateStep'
import { emailResultType } from '~/stores/modules/contents/pressRelease/pressRelease'
import { openToast } from '~/utils/common/toast'
import useRouteChangeBlocking from '~/utils/hooks/common/useRouteChangeblocking'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const PressRelease = () => {
  const {
    isDemoLicense,
    tab,
    checkMoving,
    checkReservedEmailCount,
    init,
    isEdit,
    setReUrl,
    draftList,
    initDraftListPopup,
  } = usePressRelese()
  const { offRouteChangeBlocking } = useRouteChangeBlocking(() => checkMoving(), isEdit, setReUrl)

  const checkCount = async () => {
    if (!isDemoLicense) {
      const res: emailResultType = checkReservedEmailCount()
      if (res.resultCode === 'warning') {
        openToast(<EmailWarningMsg emailReservedCount={res.resultCount} />, 'warning')
      }
    }
  }

  useLayoutEffect(() => {
    init()
    checkCount()
  }, [])

  return (
    <>
      {tab.id === 'setting' && (
        <DraftListNotification
          draftList={draftList}
          title={`배포하지 않은 보도자료 초안이 ${draftList.count}개 있습니다.`}
          initDraftListPopup={initDraftListPopup}
        />
      )}
      <div className="mb-container">
        <div className="mb-common-inner distribute">
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__header">
                <div className="distribute-steps__header">
                  <h2 className="distribute-steps-header__title">보도자료 배포: {tab.title}</h2>
                  <div className="distribute-steps-header__group">
                    <Steps />
                  </div>
                </div>
              </div>
              <SettingStep offRouteChangeBlocking={offRouteChangeBlocking} />
              <TemplateStep offRouteChangeBlocking={offRouteChangeBlocking} />
              <ContentsStep offRouteChangeBlocking={offRouteChangeBlocking} />
              <ConfirmStep />
            </div>
          </div>
        </div>
      </div>
      <OutMessagePopup offRouteChangeBlocking={offRouteChangeBlocking} />
      <NoticePopup />
      <TemplateDeletePopup />
      <TemplateChangePopup />
      <ContactInfoPopup />
      <PreviewPopup />
      <TemplatePopup />
      <MediaPopup />
      <TestEmailSenderPopup />
      <ReleasePopup />
      <InputMediaPopup />
    </>
  )
}

export default PressRelease
