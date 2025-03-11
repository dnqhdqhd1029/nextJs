import { Fragment, useEffect, useLayoutEffect } from 'react'

import PressMediaListBookPopup from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaListBookPopup'
import SearchLimitAlarm from '~/components/contents/common/notiNodes/SearchLimitAlarm'
import LeftContent from '~/components/contents/pressMedia/SavedSearch/LeftContent/LeftContent'
import SearchFilter from '~/components/contents/pressMedia/SavedSearch/LeftContent/SearchFilter'
import MediaContent from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Media/Content/Content'
import MediaFooter from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Media/Footer/Footer'
import MediaHeader from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Media/Header/Header'
import PressContent from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Press/Content/Content'
import PressFooter from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Press/Footer/Footer'
import PressHeader from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Press/Header/Header'
import AddPersonalContact from '~/components/contents/pressMedia/SavedSearch/Popup/AddPersonalContact'
import BasicFieldPopup from '~/components/contents/pressMedia/SavedSearch/Popup/BasicFieldPopup'
import BasicLocationPopup from '~/components/contents/pressMedia/SavedSearch/Popup/BasicLocationPopup'
import BlockedEmailSenderPopup from '~/components/contents/pressMedia/SavedSearch/Popup/BlockedEmailSenderPopup'
import ContentDeletePopup from '~/components/contents/pressMedia/SavedSearch/Popup/ContentDeletePopup'
import DeleteUserMediaPopup from '~/components/contents/pressMedia/SavedSearch/Popup/DeleteUserMediaPopup'
import DeleteUserPressPopup from '~/components/contents/pressMedia/SavedSearch/Popup/DeleteUserPressPopup'
import MediaFieldPopup from '~/components/contents/pressMedia/SavedSearch/Popup/MediaFieldPopup'
import MediaLocationPopup from '~/components/contents/pressMedia/SavedSearch/Popup/MediaLocationPopup'
import MediaSavedSearchEditPopup from '~/components/contents/pressMedia/SavedSearch/Popup/MediaSavedSearchEditPopup'
import MediaTypePopup from '~/components/contents/pressMedia/SavedSearch/Popup/MediaTypePopup'
import PressMediaErrReportPopup from '~/components/contents/pressMedia/SavedSearch/Popup/PressMediaErrReportPopup'
import PressMediaUnBlockPopup from '~/components/contents/pressMedia/SavedSearch/Popup/PressMediaUnBlockPopup'
import PressSavedSearchEditPopup from '~/components/contents/pressMedia/SavedSearch/Popup/PressSavedSearchEditPopup'
import RegisterJournalistPhotoPopup from '~/components/contents/pressMedia/SavedSearch/Popup/RegisterJournalPhotoPopup'
import RegisterMediaPhotoPopup from '~/components/contents/pressMedia/SavedSearch/Popup/RegisterMediaPhotoPopup'
import SearchRegisterPopup from '~/components/contents/pressMedia/SavedSearch/Popup/SearchRegisterPopup'
import UserProfilePopup from '~/components/contents/pressMedia/SavedSearch/Popup/UserProfilePopup'
import MediaRightContent from '~/components/contents/pressMedia/SavedSearch/RightContent/Media/MediaRightContent'
import MediaNotice from '~/components/contents/pressMedia/SavedSearch/RightContent/Media/Notice'
import PressNotice from '~/components/contents/pressMedia/SavedSearch/RightContent/Press/Notice'
import PressRightContent from '~/components/contents/pressMedia/SavedSearch/RightContent/Press/Press'
import SearchOption from '~/components/contents/pressMedia/SavedSearch/SearchOption/SearchOption'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const Search = () => {
  const {
    searchLimitAlarm,
    mediaApiList,
    mediaIdKeyParam,
    mediaDto,
    editPageOpen,
    listDefine,
    journalApiList,
    journalIdKeyParam,
    pressDto,
    init,
    afterPressRegistAddReLoad,
    afterMediaRegistAddReLoad,
  } = useSavedSearch()
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
          {editPageOpen ? (
            <SearchOption />
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </div>
      </div>

      <SearchRegisterPopup />
      <RegisterJournalistPhotoPopup />
      <AddPersonalContact />
      <PressMediaErrReportPopup />
      <PressMediaUnBlockPopup />
      <BlockedEmailSenderPopup />
      <RegisterMediaPhotoPopup />
      <MediaFieldPopup />
      <MediaLocationPopup />
      <MediaTypePopup />
      <DeleteUserMediaPopup />
      <DeleteUserPressPopup />
      <UserProfilePopup />
      <ContentDeletePopup />
      <BasicFieldPopup />
      <BasicLocationPopup />
      <PressSavedSearchEditPopup />
      <MediaSavedSearchEditPopup />
      <PressMediaListBookPopup
        onChangeInitAction={(i, k) =>
          listDefine !== 'media'
            ? journalIdKeyParam && afterPressRegistAddReLoad(pressDto, journalApiList, journalIdKeyParam, k)
            : mediaIdKeyParam && afterMediaRegistAddReLoad(mediaDto, mediaApiList, mediaIdKeyParam, k)
        }
      />
    </>
  )
}

export default Search
