import { useLayoutEffect } from 'react'

import DraftListNotification from '~/components/contents/distribution/common/Popup/DraftListNotification'
import MediaPopup from '~/components/contents/distribution/common/Popup/MediaPopup'
import ConfirmStep from '~/components/contents/distribution/NewswireRelease/ConfirmStep/ConfirmStep'
import ContentsStep from '~/components/contents/distribution/NewswireRelease/ContentsStep/ContentsStep'
import ImportPressReleasePopup from '~/components/contents/distribution/NewswireRelease/Popup/ImportPressReleasePopup'
import InputMediaPopup from '~/components/contents/distribution/NewswireRelease/Popup/InputMediaPopup'
import OutMessagePopup from '~/components/contents/distribution/NewswireRelease/Popup/OutMessagePopup'
import PreviewPopup from '~/components/contents/distribution/NewswireRelease/Popup/PreviewPopup'
import SettingStep from '~/components/contents/distribution/NewswireRelease/SettingStep/SettingStep'
import Steps from '~/components/contents/distribution/NewswireRelease/Step/Step'
import useRouteChangeBlocking from '~/utils/hooks/common/useRouteChangeblocking'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

const NewswireRelease = () => {
  const {
    tab,
    checkMoving,
    init,
    isEdit,
    setReUrl,
    mediaPopup,
    closeMediaPopup,
    editorData,
    contentPageData,
    actionMediaPopup,
    draftList,
    initDraftListPopup,
    mediaUploadFile,
    setMediaPopupSizeAction,
    setMediaFileImagePopupAction,
    setEditorMediaFileCheckPopupAction,
    setEditorMediaImageCheckPopupAction,
    setDeleteMediaImagePopupAction,
  } = useNewswireRelease()
  const { offRouteChangeBlocking } = useRouteChangeBlocking(() => checkMoving(), isEdit, setReUrl)

  useLayoutEffect(() => {
    init()
  }, [])

  return (
    <>
      {/* <DraftListNotification
        draftList={draftList}
        title={`배포하지 않은 뉴스와이어 배포 초안이 ${draftList.count}개 있습니다.`}
        initDraftListPopup={initDraftListPopup}
      /> */}
      <div className="mb-container">
        <div className="mb-common-inner distribute">
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__header">
                <div className="distribute-steps__header">
                  <h2 className="distribute-steps-header__title">뉴스와이어 배포: {tab.title}</h2>
                  <div className="distribute-steps-header__group">
                    <Steps />
                  </div>
                </div>
              </div>
              <ContentsStep offRouteChangeBlocking={offRouteChangeBlocking} />
              <SettingStep offRouteChangeBlocking={offRouteChangeBlocking} />
              <ConfirmStep />
            </div>
          </div>
        </div>
      </div>
      <OutMessagePopup offRouteChangeBlocking={offRouteChangeBlocking} />
      <PreviewPopup />
      <MediaPopup
        mediaPopup={mediaPopup}
        closeMediaPopup={closeMediaPopup}
        editorData={editorData}
        contentPageData={contentPageData}
        actionMediaPopup={actionMediaPopup}
        mediaUploadFile={mediaUploadFile}
        setMediaPopupSizeAction={setMediaPopupSizeAction}
        setMediaFileImagePopupAction={setMediaFileImagePopupAction}
        setEditorMediaFileCheckPopupAction={setEditorMediaFileCheckPopupAction}
        setEditorMediaImageCheckPopupAction={setEditorMediaImageCheckPopupAction}
        setDeleteMediaImagePopupAction={setDeleteMediaImagePopupAction}
      />
      <InputMediaPopup />
      <ImportPressReleasePopup />
    </>
  )
}

export default NewswireRelease
