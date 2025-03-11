import { Fragment } from 'react'
import cn from 'classnames'

import Skeleton from '~/components/common/ui/Skeleton'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import JournalistItem from '~/components/contents/pressMedia/MediaProfile/Journalist/JournalItem'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'

const JournalistList = () => {
  const { mediaIdKey, mediaGroupJournalist, mediaGroupJournalistPaginationChange, mediaGroupJournalistCountPage } =
    useMediaProfile()

  return (
    <div className="tabs-panel__section">
      {2 > 6 ? (
        <div className="tabs-panel__group">
          <div className="list-type3__section">
            <ul className="list-type3__group">
              {Array.from({ length: 20 }).map((e, index) => (
                <li key={'list-type5-list-type8__group' + 'searchContentList' + index}>
                  <Skeleton
                    key={10}
                    width={'100%'}
                    height={'42px'}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Fragment>
          {mediaGroupJournalist && mediaGroupJournalist.length > 0 ? (
            <div className="tabs-panel__group">
              <div className="list-type3__section">
                <ul className="list-type3__group">
                  {mediaGroupJournalist.map(e => (
                    <JournalistItem
                      key={'tabs-panel__group_jrnlst_id' + e.jrnlst_id}
                      {...e}
                    />
                  ))}
                </ul>
              </div>
              <div className="flexible-item__pagination">
                <MbPagination
                  totalCount={mediaGroupJournalistCountPage.totalCount}
                  currentPageIndex={mediaGroupJournalistCountPage.page}
                  viewCount={mediaGroupJournalistCountPage.size}
                  totalPageCount={mediaGroupJournalistCountPage.totalPageCount}
                  onPaginationChange={(e: number) =>
                    mediaGroupJournalistPaginationChange(e, mediaGroupJournalistCountPage, mediaIdKey)
                  }
                  isPageLoadCompleted={true}
                />
              </div>
            </div>
          ) : (
            <div className="tabs-panel__group">
              <div className="list-type1__result-none">언론인이 없습니다.</div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default JournalistList
