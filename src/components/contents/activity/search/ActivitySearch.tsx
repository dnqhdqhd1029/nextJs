import { useEffect, useLayoutEffect } from 'react'

import SearchNavigation from '~/components/contents/activity/common/SearchNavigation/SearchNavigation'
import CommentDeletePopup from '~/components/contents/activity/search/CommentDeletePopup/CommentDeletePopup'
import ExcelFileDownloadPopup from '~/components/contents/activity/search/ExcelFileDownloadPopup/ExcelFileDownloadPopup'
import OwnerChangePopup from '~/components/contents/activity/search/OwnerChangePopup/OwnerChangePopup'
import RightLayer from '~/components/contents/activity/search/RightLayer/RightLayer'
import SearchContent from '~/components/contents/activity/search/SearchContent/SearchContent'
import SearchFooter from '~/components/contents/activity/search/SearchFooter/SearchFooter'
import SearchHeader from '~/components/contents/activity/search/SearchHeader/SearchHeader'
import UserProfilePopup from '~/components/contents/activity/search/UserProfilePopup/UserProfilePopup'
import TagTotalSearch from '~/components/contents/common/forms/TagTotalForm/TagTotalSearch'
import SearchLimitAlarm from '~/components/contents/common/notiNodes/SearchLimitAlarm'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const ActivitySearch = () => {
  const {
    searchLimitAlarm,
    apiParams,
    activityList,
    activityId,
    pageCount,
    tagPopup,
    searchContentKeyList,
    setInitTagPopupAction,
    init,
    editTaggingAction,
  } = useActivityList()

  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <SearchLimitAlarm isOpen={searchLimitAlarm} />
      <div className="mb-container position-relative">
        <div className="mb-common-inner search">
          <div className="mb-lnb__section type-w1 overflow-y">
            <SearchNavigation />
          </div>
          <div className="mb-contents search-result activity">
            <div className="mb-contents-layout__section">
              <SearchHeader />
              <SearchContent />
              <SearchFooter />
            </div>
          </div>
          <div className="mb-aside__section type-w3">
            <RightLayer />
          </div>
        </div>
        <UserProfilePopup />
        <CommentDeletePopup />
        <OwnerChangePopup />
        <ExcelFileDownloadPopup />
        <TagTotalSearch
          isOpen={tagPopup.isOpen}
          category={'ACTION'}
          targetCount={searchContentKeyList.length}
          originTagList={tagPopup.tagList}
          onChangeTagList={(e, i) =>
            editTaggingAction(e, searchContentKeyList, i, apiParams, activityList, activityId, pageCount)
          }
          closeTagTotalSearchPopup={() => setInitTagPopupAction()}
        />
      </div>
    </>
  )
}

export default ActivitySearch
