import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Pagination from '~/components/common/ui/Pagination'
import Skeleton from '~/components/common/ui/Skeleton'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import { getDateFormat } from '~/utils/common/date'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'

const News = () => {
  const {
    newsLoading,
    mediaIdKey,
    timeZone,
    mediaIdKeyParam,
    mediaNewsCountPage,
    mediaNewsCountPaginationInfo,
    newsListByMediaId,
    mediaHandlePaginationChange,
    moveToTotalNewsList,
  } = useMediaProfile()
  const { keywords, additionalParam } = useAppSelector(state => state.newsSearchOptionsSlice)

  return (
    <div
      className="flexible-item__group"
      style={{ display: mediaIdKeyParam && mediaIdKeyParam.isSysInfo ? 'block' : 'none' }}
    >
      <div className="flexible-item__header">
        <h4 className="font-heading--h5">뉴스</h4>
        <Button
          label={'전체 뉴스'}
          cate={'link-text-arrow'}
          size={'m'}
          color={'secondary'}
          icoRight={true}
          icoRightData={icoSvgData.chevronRight}
          onClick={() => mediaIdKeyParam && moveToTotalNewsList(mediaIdKeyParam, keywords, additionalParam)}
        />
      </div>
      <div className="flexible-item__contents">
        {newsLoading ? (
          <div className="list-type1__section">
            <ul className="list-type1__group before-none">
              {Array.from({ length: 8 }).map((e, index) => (
                <li key={'list-type5-list-type8__group' + 'searchContentList' + index}>
                  {/*<Skeleton*/}
                  {/*  key={10}*/}
                  {/*  width={'100%'}*/}
                  {/*  height={'42px'}*/}
                  {/*/>*/}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Fragment>
            {newsListByMediaId && newsListByMediaId.length > 0 ? (
              <Fragment>
                <div className="list-type1__section">
                  <ul className="list-type1__group before-none">
                    {newsListByMediaId.map(e => (
                      <li key={'newsListByJournalId' + e.newsid}>
                        <div className="list-type1__item">
                          <div className="list-type1__text">
                            <a
                              href={`/news/record/${Number(e.newsid) || 0}`}
                              className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                              target="_blank"
                            >
                              <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                                {e.title}
                              </span>
                            </a>
                            <p>
                              {getDateFormat(timeZone, e?.inserted || '')}{' '}
                              {e?.reporterList && e?.reporterList.length > 0 ? `${e?.reporterList[0].name}` : ''}{' '}
                              {e?.mname || ''}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flexible-item__pagination">
                  <Pagination
                    type={'n1'}
                    viewCount={mediaNewsCountPaginationInfo.size}
                    page={mediaNewsCountPaginationInfo.page}
                    count={mediaNewsCountPage.totalPageCount}
                    onPageChange={e => mediaHandlePaginationChange(e, mediaNewsCountPaginationInfo, mediaIdKey)}
                  />
                </div>
              </Fragment>
            ) : (
              <div className="list-type1__result-none">뉴스가 없습니다.</div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default News
