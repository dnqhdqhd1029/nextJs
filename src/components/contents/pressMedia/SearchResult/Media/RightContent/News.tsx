import cn from 'classnames'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Skeleton from '~/components/common/ui/Skeleton'
import { getDateFormat } from '~/utils/common/date'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const News = () => {
  const router = useRouter()
  const {
    mediaTab,
    mediaIdKey,
    newsLoading,
    timeZone,
    mediaNewsCountPage,
    mediaIdKeyParam,
    newsListByMediaId,
    newsListTotalCount,
    getNewsSearchByMediaId,
  } = usePressMediaSearchResult()

  if (!mediaIdKeyParam) {
    return null
  }

  return (
    <div style={{ display: mediaTab === 'news' ? 'block' : 'none' }}>
      <div className={cn('profile__section', { 'tab-content__container': true })}>
        <div className="tabs-panel__group">
          <div className="list-type1__section">
            {newsLoading ? (
              <ul className="list-type1__group before-none">
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
            ) : (
              <ul className="list-type1__group before-none">
                {newsListByMediaId && newsListByMediaId.length > 0 ? (
                  <>
                    {newsListByMediaId.map(e => (
                      <li key={'newsListByMediaId' + e.newsid}>
                        <div className="list-type1__item">
                          <div className="list-type1__text">
                            <Button
                              elem="a"
                              label={e.title || ''}
                              url={e.link}
                              target={'_blank'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={i => {
                                i.preventDefault()
                                router.push(`/news/record/${Number(e.newsid) || 0}`)
                              }}
                            />
                            <p>
                              {getDateFormat(timeZone, e?.inserted || '')}{' '}
                              {e?.reporterList && e?.reporterList.length > 0 ? `${e?.reporterList[0].name}` : ''}{' '}
                              {e?.mname || ''}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                    <div
                      className="list-type1__more"
                      style={{ paddingBottom: 40 }}
                    >
                      {newsListTotalCount > newsListByMediaId.length && (
                        <Button
                          label={'더보기'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => getNewsSearchByMediaId(mediaNewsCountPage + 10, 'news', mediaIdKey)}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div>뉴스가 없습니다.</div>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default News
