import { Fragment } from 'react'
import cn from 'classnames'

import Skeleton from '~/components/common/ui/Skeleton'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import JournalistItem from '~/components/contents/pressMedia/MediaProfile/Journalist/JournalItem'
import SubMediaItem from '~/components/contents/pressMedia/MediaProfile/Journalist/SubMediaItem'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'

const SubMedialList = () => {
  const {
    mediaGroupMediaKey,
    mediaGroupSubMediaList,
    mediaGroupSubMediaListCountPage,
    mediaGroupSubMediaPaginationChange,
  } = useMediaProfile()

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
          {mediaGroupSubMediaList && mediaGroupSubMediaList.length > 0 ? (
            <div className="tabs-panel__group">
              <div className="list-type3__section">
                <ul className="list-type3__group">
                  {mediaGroupSubMediaList.map(e => (
                    <SubMediaItem
                      key={'tabs-panel__group_mediaGroupSubMediaList' + e.mid}
                      {...e}
                    />
                  ))}
                </ul>
              </div>
              <div className="flexible-item__pagination">
                <MbPagination
                  totalCount={mediaGroupSubMediaListCountPage.totalCount}
                  currentPageIndex={mediaGroupSubMediaListCountPage.page}
                  viewCount={mediaGroupSubMediaListCountPage.size}
                  totalPageCount={mediaGroupSubMediaListCountPage.totalPageCount}
                  onPaginationChange={(e: number) =>
                    mediaGroupSubMediaPaginationChange(e, mediaGroupSubMediaListCountPage, mediaGroupMediaKey)
                  }
                  isPageLoadCompleted={true}
                />
              </div>
            </div>
          ) : (
            <div className="tabs-panel__group">
              <div className="list-type1__result-none">계열 미디어가 없습니다.</div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default SubMedialList
