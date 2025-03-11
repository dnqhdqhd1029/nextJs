import { Fragment, useEffect, useLayoutEffect } from 'react'

import PressMediaListBookPopup from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaListBookPopup'
import SearchLimitAlarm from '~/components/contents/common/notiNodes/SearchLimitAlarm'
import LeftContent from '~/components/contents/pressMedia/List/Result/LeftContent/LeftContent'
import SearchFilter from '~/components/contents/pressMedia/List/Result/LeftContent/SearchFilter'
import MediaContent from '~/components/contents/pressMedia/List/Result/MiddleContent/Media/Content/MediaContent'
import MediaFooter from '~/components/contents/pressMedia/List/Result/MiddleContent/Media/Footer/MediaFooter'
import MediaHeader from '~/components/contents/pressMedia/List/Result/MiddleContent/Media/Header/MediaHeader'
import PressContent from '~/components/contents/pressMedia/List/Result/MiddleContent/Press/Content/PressContent'
import PressFooter from '~/components/contents/pressMedia/List/Result/MiddleContent/Press/Footer/PressFooter'
import PressHeader from '~/components/contents/pressMedia/List/Result/MiddleContent/Press/Header/PressHeader'
import AddPersonalContact from '~/components/contents/pressMedia/List/Result/Popup/AddPersonalContact'
import BlockedEmailSenderPopup from '~/components/contents/pressMedia/List/Result/Popup/BlockedEmailSenderPopup'
import ContentDeletePopup from '~/components/contents/pressMedia/List/Result/Popup/ContentDeletePopup'
import DeleteUserMediaPopup from '~/components/contents/pressMedia/List/Result/Popup/DeleteUserMediaPopup'
import DeleteUserPressPopup from '~/components/contents/pressMedia/List/Result/Popup/DeleteUserPressPopup'
import PressMediaErrReportPopup from '~/components/contents/pressMedia/List/Result/Popup/PressMediaErrReportPopup'
import PressMediaUnBlockPopup from '~/components/contents/pressMedia/List/Result/Popup/PressMediaUnBlockPopup'
import RegisterJournalistPhotoPopup from '~/components/contents/pressMedia/List/Result/Popup/RegisterJournalistPhotoPopup'
import RegisterMediaPhotoPopup from '~/components/contents/pressMedia/List/Result/Popup/RegisterMediaPhotoPopup'
import UserProfilePopup from '~/components/contents/pressMedia/List/Result/Popup/UserProfilePopup'
import MediaNotice from '~/components/contents/pressMedia/List/Result/RightContent/Media/MediaNotice'
import MediaRightContent from '~/components/contents/pressMedia/List/Result/RightContent/Media/MediaRightContent'
import PressNotice from '~/components/contents/pressMedia/List/Result/RightContent/Press/PressNotice'
import PressRightContent from '~/components/contents/pressMedia/List/Result/RightContent/Press/PressRightContent'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const Search = () => {
  const {
    journalArrayId,
    mediaArrayId,
    searchLimitAlarm,
    isOwner,
    isFilterSubParam,
    journalApiList,
    journalIdKeyParam,
    pressDto,
    mediaDto,
    mediaApiList,
    mediaIdKeyParam,
    listDefine,
    init,
    afterMediaPopupReLoadAction,
    afterPressPopupReLoadAction,
  } = usePressMediaListResult()

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <SearchLimitAlarm isOpen={searchLimitAlarm} />
      <div className="mb-container position-relative">
        <div className="mb-common-inner search">
          <div className="mb-lnb__section type-w1 overflow-y">
            <div className="lnb-search__section">
              <LeftContent />
              <SearchFilter />
            </div>
          </div>
          <div className="mb-contents search-result">
            {listDefine === 'press' ? (
              <div className="mb-contents-layout__section">
                <PressHeader />
                <PressContent />
                <PressFooter />
              </div>
            ) : (
              <div className="mb-contents-layout__section">
                <MediaHeader />
                <MediaContent />
                <MediaFooter />
              </div>
            )}
          </div>
          {listDefine === 'press' ? (
            <div className="mb-aside__section type-w2">
              <PressNotice />
              <PressRightContent />
            </div>
          ) : (
            <div className="mb-aside__section type-w2">
              <MediaNotice />
              <MediaRightContent />
            </div>
          )}
        </div>
      </div>

      <RegisterJournalistPhotoPopup />
      <AddPersonalContact />
      <PressMediaErrReportPopup />
      <PressMediaUnBlockPopup />
      <BlockedEmailSenderPopup />
      <RegisterMediaPhotoPopup />
      <DeleteUserMediaPopup />
      <DeleteUserPressPopup />
      <UserProfilePopup />
      <ContentDeletePopup />
      <PressMediaListBookPopup
        onChangeInitAction={(i, k) =>
          listDefine !== 'press'
            ? mediaIdKeyParam &&
              afterMediaPopupReLoadAction(
                mediaArrayId,
                isOwner,
                isFilterSubParam,
                mediaDto,
                mediaApiList,
                mediaIdKeyParam,
                i,
                k
              )
            : journalIdKeyParam &&
              afterPressPopupReLoadAction(
                journalArrayId,
                isOwner,
                isFilterSubParam,
                pressDto,
                journalApiList,
                journalIdKeyParam,
                i,
                k
              )
        }
      />
    </>
  )
}

export default Search
