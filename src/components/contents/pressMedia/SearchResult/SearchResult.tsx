import { useEffect, useLayoutEffect } from 'react'

import PressMediaListBookPopup from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaListBookPopup'
import SearchLimitAlarm from '~/components/contents/common/notiNodes/SearchLimitAlarm'
import MediaSearchFilter from '~/components/contents/pressMedia/SearchResult/Media/LeftContent/MediaSearchFilter'
import MediaMiddleContent from '~/components/contents/pressMedia/SearchResult/Media/MiddleContent/MiddleContent'
import MediaNotice from '~/components/contents/pressMedia/SearchResult/Media/Notice/Notice'
import MediaRightContent from '~/components/contents/pressMedia/SearchResult/Media/RightContent/RightContent'
import AddPersonalContact from '~/components/contents/pressMedia/SearchResult/Popup/AddPersonalContact'
import BlockedEmailSenderPopup from '~/components/contents/pressMedia/SearchResult/Popup/BlockedEmailSenderPopup'
import DeleteUserMediaPopup from '~/components/contents/pressMedia/SearchResult/Popup/DeleteUserMediaPopup'
import DeleteUserPressPopup from '~/components/contents/pressMedia/SearchResult/Popup/DeleteUserPressPopup'
import ExcelFileDownloadPopup from '~/components/contents/pressMedia/SearchResult/Popup/ExcelFileDownloadPopup'
import PressMediaErrReportPopup from '~/components/contents/pressMedia/SearchResult/Popup/PressMediaErrReportPopup'
import PressMediaUnBlockPopup from '~/components/contents/pressMedia/SearchResult/Popup/PressMediaUnBlockPopup'
import RegisterJournalistPhotoPopup from '~/components/contents/pressMedia/SearchResult/Popup/RegisterJournalPhotoPopup'
import RegisterMediaPhotoPopup from '~/components/contents/pressMedia/SearchResult/Popup/RegisterMediaPhotoPopup'
import SearchRegisterPopup from '~/components/contents/pressMedia/SearchResult/Popup/SearchRegisterPopup'
import UserProfilePopup from '~/components/contents/pressMedia/SearchResult/Popup/UserProfilePopup'
import PressSearchFilter from '~/components/contents/pressMedia/SearchResult/Press/LeftContent/PressSearchFilter'
import PressMiddleContent from '~/components/contents/pressMedia/SearchResult/Press/MiddleContent/MiddleContent'
import PressNotice from '~/components/contents/pressMedia/SearchResult/Press/Notice/Notice'
import PressRightContent from '~/components/contents/pressMedia/SearchResult/Press/RightContent/RightContent'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const SearchResult = () => {
  const {
    mediaDto,
    mediaApiList,
    mediaIdKeyParam,
    searchLimitAlarm,
    pressDto,
    journalApiList,
    journalIdKeyParam,
    listDefine,
    init,
    afterPressRegistAddReLoad,
    afterMediaRegistAddReLoad,
  } = usePressMediaSearchResult()

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
              {listDefine === 'media' ? <MediaSearchFilter /> : <PressSearchFilter />}
            </div>
          </div>
          <div className="mb-contents search-result">
            {listDefine === 'media' ? <MediaMiddleContent /> : <PressMiddleContent />}
          </div>
          {listDefine === 'media' ? (
            <div className="mb-aside__section type-w2">
              <MediaNotice />
              <MediaRightContent />
            </div>
          ) : (
            <div className="mb-aside__section type-w2">
              <PressNotice />
              <PressRightContent />
            </div>
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
      <DeleteUserMediaPopup />
      <DeleteUserPressPopup />
      <UserProfilePopup />
      <ExcelFileDownloadPopup />
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

export default SearchResult
