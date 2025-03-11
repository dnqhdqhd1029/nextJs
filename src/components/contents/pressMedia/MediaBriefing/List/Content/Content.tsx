import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

import IcoAvatar from '~/components/common/ui/IcoAvatar'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Image from '~/components/common/ui/Image'
import { useMediaBriefing } from '~/utils/hooks/contents/mediaBriefing/useMediaBriefing'

const Content = () => {
  const router = useRouter()
  const { mediabriefingSearchList } = useMediaBriefing()
  return (
    <div className="service-search-contents__section">
      <p className="service-search-result__msg">검색 결과 {mediabriefingSearchList.length}개</p>
      <div className="service-search-contents__list">
        <div className="list-type11__section">
          {mediabriefingSearchList && mediabriefingSearchList.length > 0 && (
            <ul className="list-type11__group">
              {mediabriefingSearchList.map(e => (
                <li key={'mediabriefingSearchList' + e.itemId + e.itemTitle}>
                  <div className="list-type11-item__section">
                    <div className="list-type11-item__group">
                      {e.itemImg === '' ? (
                        <div className="list-type11-item__thumb type-bd-none">
                          <Link
                            href={`/media-briefing/${e.itemId}`}
                            legacyBehavior
                          >
                            <a>
                              <IcoAvatar
                                label={'이미지없음'}
                                icoData={icoSvgData.personFill}
                                size={'s100'}
                                icoSize={'s50'}
                              />
                            </a>
                          </Link>
                        </div>
                      ) : (
                        <div className="list-type11-item__thumb">
                          {/* 이미지 있을 때 - 정사각형 기준 */}
                          <Link
                            href={`/media-briefing/${e.itemId}`}
                            legacyBehavior
                          >
                            <a>
                              <Image
                                src={e.itemImg}
                                width={500}
                                height={500}
                                alt={e.itemTitle}
                              />
                            </a>
                          </Link>
                        </div>
                      )}
                      <div
                        className="list-type11-item__contents"
                        onClick={() => router.push(`/media-briefing/${e.itemId}`)}
                      >
                        <h4 className="list-type11-item__title">{e.itemTitle}</h4>
                        <p className="list-type11-item__desc">{e.itemContent}</p>
                        <p className="list-type11-item__text">{moment(e.itemDate).format('YYYY-MM-DD')}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Content
