import { Fragment, useEffect, useLayoutEffect } from 'react'

import PressMediaListBookPopup from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaListBookPopup'
import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import Activity from '~/components/contents/pressMedia/MediaProfile/Activity/Activity'
import Journalist from '~/components/contents/pressMedia/MediaProfile/Journalist/Journalist'
import News from '~/components/contents/pressMedia/MediaProfile/News/News'
import Notice from '~/components/contents/pressMedia/MediaProfile/Notice/Notice'
import AddPersonalContact from '~/components/contents/pressMedia/MediaProfile/Popup/AddPersonalContact'
import BlockedEmailSenderPopup from '~/components/contents/pressMedia/MediaProfile/Popup/BlockedEmailSenderPopup'
import DuplicatePopup from '~/components/contents/pressMedia/MediaProfile/Popup/DuplicatePopup'
import MediaProfileEdit from '~/components/contents/pressMedia/MediaProfile/Popup/MediaProfileEdit'
import PressMediaErrReportPopup from '~/components/contents/pressMedia/MediaProfile/Popup/PressMediaErrReportPopup'
import PressMediaUnBlockPopup from '~/components/contents/pressMedia/MediaProfile/Popup/PressMediaUnBlockPopup'
import RegisterMediaPhotoPopup from '~/components/contents/pressMedia/MediaProfile/Popup/RegisterMediaPhotoPopup'
import UserProfilePopup from '~/components/contents/pressMedia/MediaProfile/Popup/UserProfilePopup'
import Profile from '~/components/contents/pressMedia/MediaProfile/Profile/Profile'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'

const MediaProfilePage = () => {
  const {
    mediaIdKey,
    addressPopup,
    mediaPersonalParamsPopup,
    mediaIdKeyParam,
    addressPopupHandle,
    init,
    pressPersonalAddressNmAction,
    afterMediaRegistAddReLoad,
  } = useMediaProfile()
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Notice />
      <div className="mb-container position-relative">
        <div className="mb-common-inner type-w1">
          <div
            className="mb-lnb__section"
            // style={{
            //   //top: '52px',
            //   height: `calc(100% - ${52}px)`,
            // }}
          >
            <Profile />
          </div>
          <div className="mb-contents">
            <div className="flexible__section type-n1">
              <div className="flexible__group">
                <Activity />
                <News />
              </div>
              <div className="flexible__group">{mediaIdKeyParam && mediaIdKeyParam.isSysInfo && <Journalist />}</div>
            </div>
          </div>
        </div>
      </div>
      <BlockedEmailSenderPopup />
      <RegisterMediaPhotoPopup />
      <PressMediaUnBlockPopup />
      <AddPersonalContact />
      <PressMediaErrReportPopup />
      <DuplicatePopup />
      <MediaProfileEdit />
      <UserProfilePopup />
      <PressMediaListBookPopup
        onChangeInitAction={(i, k) => mediaIdKeyParam && afterMediaRegistAddReLoad(mediaIdKey, mediaIdKeyParam, k)}
      />
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => addressPopupHandle(false)}
        onSelectAddress={e => pressPersonalAddressNmAction(e, mediaPersonalParamsPopup)}
      />
    </>
  )
}

export default MediaProfilePage
