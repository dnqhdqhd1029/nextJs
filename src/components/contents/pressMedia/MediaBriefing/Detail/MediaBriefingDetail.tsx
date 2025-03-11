import DOMPurify from 'dompurify'
import moment from 'moment/moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { useMediaBriefing } from '~/utils/hooks/contents/mediaBriefing/useMediaBriefing'

const MediaBriefingDetail = () => {
  const router = useRouter()
  const { mediabriefingData, mediabriefingSearchShortList } = useMediaBriefing()
  return (
    <div className="mb-container responsive-type1 bg-body type-pb24">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="service-search__header">
            <div className="common-title__section">
              <div className="common-title__group">
                <div className="common-title__path">
                  <Button
                    label={'arrowLeft'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.arrowLeft}
                    icoSize={24}
                    onClick={() => router.back()}
                  />
                </div>
                <h2 className="common-title__title">{mediabriefingData.title}</h2>
              </div>
            </div>
          </div>
          <div className="service-search-contents__section">
            <div className="service-search-contents__detail">
              <div className="service-search-detail__section">
                <div className="service-search-detail__contents">
                  <h4 className="detail-header__title">{mediabriefingData.title}</h4>
                  <p className="detail-header__date">{moment(mediabriefingData.date).format('YYYY-MM-DD')}</p>
                </div>
                <div className="service-search-detail__contents">
                  {mediabriefingData?.content && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(mediabriefingData?.content?.replaceAll('ruby-text', 'block'), {
                          ADD_ATTR: ['target', 'rel'],
                        }),
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="service-search-detail__aside">
                <h3 className="service-search-aside__title">최신 소식</h3>
                {mediabriefingSearchShortList && mediabriefingSearchShortList.length > 0 && (
                  <ul className="service-search-aside__list">
                    {mediabriefingSearchShortList.map(e => (
                      <li key={'mediabriefingSearchShortList' + e.itemId + e.itemTitle}>
                        <Link
                          href="/media-briefing"
                          legacyBehavior
                        >
                          <a className="service-search-aside__link">{e.itemTitle}</a>
                        </Link>
                        <p className="service-search-aside__date">{moment(e.itemDate).format('YYYY-MM-DD')}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaBriefingDetail
