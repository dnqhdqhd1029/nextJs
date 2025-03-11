import { Fragment, useEffect, useLayoutEffect } from 'react'

import PressMediaListBookPopup from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaListBookPopup'
import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import Activity from '~/components/contents/pressMedia/PressProfile/Activity/Activity'
import MediaProfile from '~/components/contents/pressMedia/PressProfile/MediaProfile/MediaProfile'
import News from '~/components/contents/pressMedia/PressProfile/News/News'
import Notice from '~/components/contents/pressMedia/PressProfile/Notice/Notice'
import AddPersonalContact from '~/components/contents/pressMedia/PressProfile/Popup/AddPersonalContact'
import BlockedEmailSenderPopup from '~/components/contents/pressMedia/PressProfile/Popup/BlockedEmailSenderPopup'
import DuplicatePopup from '~/components/contents/pressMedia/PressProfile/Popup/DuplicatePopup'
import PressMediaErrReportPopup from '~/components/contents/pressMedia/PressProfile/Popup/PressMediaErrReportPopup'
import PressMediaUnBlockPopup from '~/components/contents/pressMedia/PressProfile/Popup/PressMediaUnBlockPopup'
import PressProfileEdit from '~/components/contents/pressMedia/PressProfile/Popup/PressProfileEdit'
import RegisterJournalistPhotoPopup from '~/components/contents/pressMedia/PressProfile/Popup/RegisterJournalistPhotoPopup'
import UserProfilePopup from '~/components/contents/pressMedia/PressProfile/Popup/UserProfilePopup'
import Profile from '~/components/contents/pressMedia/PressProfile/Profile/Profile'
import WordCloud from '~/components/contents/pressMedia/PressProfile/WordCloud/WordCloud'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'

const PressProfilePage = () => {
  const {
    journalIdKey,
    journalIdKeyParam,
    addressPopup,
    journalistTagTypeList,
    pressPersonalParamsPopup,
    addressPopupHandle,
    pressPersonalAddressNmAction,
    afterPressRegistAddReLoad,
    init,
  } = usePressProfile()
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
              <div className="flexible__group">
                {journalIdKeyParam && journalIdKeyParam.isSysInfo && (
                  <>
                    {journalistTagTypeList && journalistTagTypeList.length > 0 && <WordCloud />}
                    <MediaProfile />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlockedEmailSenderPopup />
      <RegisterJournalistPhotoPopup />
      <PressMediaUnBlockPopup />
      <AddPersonalContact />
      <PressMediaErrReportPopup />
      <DuplicatePopup />
      <PressProfileEdit />
      <UserProfilePopup />
      <PressMediaListBookPopup
        onChangeInitAction={(i, k) =>
          journalIdKeyParam && afterPressRegistAddReLoad(journalIdKey, journalIdKeyParam, k)
        }
      />
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => addressPopupHandle(false)}
        onSelectAddress={e => pressPersonalAddressNmAction(e, pressPersonalParamsPopup)}
      />
    </>
  )
}

export default PressProfilePage
