import { Fragment, useEffect, useState } from 'react'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tag from '~/components/common/ui/Tag'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const SearchOption = () => {
  const {
    mediaListParams,
    mediaDto,
    mediaParamsExpandButton,
    setMediaParamsExpandButtonAction,
    setMediaTagDeleteControlSearch,
    setMediaTagControlSearch,
  } = usePressMediaSearchResult()
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const headerElement = document.getElementById('mediaListParams_disable_div')
    if (headerElement) {
      setHeaderHeight(headerElement.clientHeight)
    }
  }, [mediaListParams])

  return (
    <li>
      <div
        className={'search-result__header-tags mt-12 display-flex'}
        style={{ height: headerHeight === 0 ? 42 : !mediaParamsExpandButton ? 42 : 'unset' }}
      >
        <div className="header-tags__group">
          {mediaListParams.keywordParam.mediaTagList && mediaListParams.keywordParam.mediaTagList.length > 0 && (
            <>
              <div className="header-tags__tit">매체명</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaTagList.length > 0 &&
                mediaListParams.keywordParam.mediaTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaTagList', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaType && mediaListParams.keywordParam.mediaType.length > 0 && (
            <>
              <div className="header-tags__tit">미디어유형</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaType.length > 0 &&
                mediaListParams.keywordParam.mediaType.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaType.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaType', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaField && mediaListParams.keywordParam.mediaField.length > 0 && (
            <>
              <div className="header-tags__tit">미디어분야</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaField.length > 0 &&
                mediaListParams.keywordParam.mediaField.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaField.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaField', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaArea && mediaListParams.keywordParam.mediaArea.length > 0 && (
            <>
              <div className="header-tags__tit">미디어지역</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaArea.length > 0 &&
                mediaListParams.keywordParam.mediaArea.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaArea.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaArea', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.keyword && mediaListParams.keywordParam.keyword.length > 0 && (
            <>
              <div className="header-tags__tit">키워드</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.keyword.length > 0 &&
                mediaListParams.keywordParam.keyword.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.keyword.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'keyword', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaGroupList && mediaListParams.keywordParam.mediaGroupList.length > 0 && (
            <>
              <div className="header-tags__tit">매체 그룹</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaGroupList.length > 0 &&
                mediaListParams.keywordParam.mediaGroupList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaGroupList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaGroupList', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.informationType && mediaListParams.keywordParam.informationType.id !== '' && (
            <>
              <div className="header-tags__tit">매체 지수</div>
              <div className="header-tags__tag">
                <Tag
                  label={mediaListParams.keywordParam.informationType.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'informationType', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.keywordParam.publishingPeriod &&
            mediaListParams.keywordParam.publishingPeriod.length > 0 && (
              <>
                <div className="header-tags__tit">발행 주기</div>
                {mediaListParams.keywordParam &&
                  mediaListParams.keywordParam.publishingPeriod.length > 0 &&
                  mediaListParams.keywordParam.publishingPeriod.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === mediaListParams.keywordParam.publishingPeriod.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.mediaType' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'publishingPeriod', mediaDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {mediaListParams.additionalParam.journalistTargetList &&
            mediaListParams.additionalParam.journalistTargetList.length > 0 && (
              <>
                <div className="header-tags__tit">언론인 목록</div>
                {mediaListParams.additionalParam &&
                  mediaListParams.additionalParam.journalistTargetList.length > 0 &&
                  mediaListParams.additionalParam.journalistTargetList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === mediaListParams.additionalParam.journalistTargetList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.mediaType' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() =>
                          setMediaTagDeleteControlSearch(e, mediaListParams, 'journalistTargetList', mediaDto)
                        }
                      />
                    </div>
                  ))}
              </>
            )}
          {mediaListParams.additionalParam.portal && mediaListParams.additionalParam.portal.length > 0 && (
            <>
              <div className="header-tags__tit">포털 제휴</div>
              {mediaListParams.additionalParam &&
                mediaListParams.additionalParam.portal.length > 0 &&
                mediaListParams.additionalParam.portal.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.additionalParam.portal.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'portal', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.additionalParam.languageParam && mediaListParams.additionalParam.languageParam.id !== '' && (
            <>
              <div className="header-tags__tit">언어</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.languageParam.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'languageParam', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.additionalParam.isJournalist && mediaListParams.additionalParam.isJournalist.id !== '' && (
            <>
              <div className="header-tags__tit">기자명 노출</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.isJournalist.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'isJournalist', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.additionalParam.system && mediaListParams.additionalParam.system.id !== '' && (
            <>
              <div className="header-tags__tit">정보 유형</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.system.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'system', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.additionalParam.limit && mediaListParams.additionalParam.limit.id !== '' && (
            <>
              <div className="header-tags__tit">차단 여부</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.limit.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'limit', mediaDto)}
                />
              </div>
            </>
          )}
        </div>
        {headerHeight > 42 && (
          <div
            className="header-tags__button"
            onClick={() => setMediaParamsExpandButtonAction(!mediaParamsExpandButton)}
          >
            <button type="button">
              <IcoSvg data={!mediaParamsExpandButton ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
            </button>
          </div>
        )}
      </div>
      <div
        className={'search-result__header-tags mt-12 display-flex'}
        style={{
          position: 'absolute',
          opacity: 0,
          width: 776,
          right: '-99999px',
        }}
      >
        <div
          id="mediaListParams_disable_div"
          className="header-tags__group"
        >
          {mediaListParams.keywordParam.mediaTagList && mediaListParams.keywordParam.mediaTagList.length > 0 && (
            <>
              <div className="header-tags__tit">매체명</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaTagList.length > 0 &&
                mediaListParams.keywordParam.mediaTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaTagList', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaType && mediaListParams.keywordParam.mediaType.length > 0 && (
            <>
              <div className="header-tags__tit">미디어유형</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaType.length > 0 &&
                mediaListParams.keywordParam.mediaType.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaType.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaType', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaField && mediaListParams.keywordParam.mediaField.length > 0 && (
            <>
              <div className="header-tags__tit">미디어분야</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaField.length > 0 &&
                mediaListParams.keywordParam.mediaField.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaField.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaField', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaArea && mediaListParams.keywordParam.mediaArea.length > 0 && (
            <>
              <div className="header-tags__tit">미디어지역</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaArea.length > 0 &&
                mediaListParams.keywordParam.mediaArea.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaArea.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaArea', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.keyword && mediaListParams.keywordParam.keyword.length > 0 && (
            <>
              <div className="header-tags__tit">키워드</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.keyword.length > 0 &&
                mediaListParams.keywordParam.keyword.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.keyword.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'keyword', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.mediaGroupList && mediaListParams.keywordParam.mediaGroupList.length > 0 && (
            <>
              <div className="header-tags__tit">매체 그룹</div>
              {mediaListParams.keywordParam &&
                mediaListParams.keywordParam.mediaGroupList.length > 0 &&
                mediaListParams.keywordParam.mediaGroupList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.keywordParam.mediaGroupList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'mediaGroupList', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.keywordParam.informationType && mediaListParams.keywordParam.informationType.id !== '' && (
            <>
              <div className="header-tags__tit">매체 지수</div>
              <div className="header-tags__tag">
                <Tag
                  label={mediaListParams.keywordParam.informationType.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'informationType', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.keywordParam.publishingPeriod &&
            mediaListParams.keywordParam.publishingPeriod.length > 0 && (
              <>
                <div className="header-tags__tit">발행 주기</div>
                {mediaListParams.keywordParam &&
                  mediaListParams.keywordParam.publishingPeriod.length > 0 &&
                  mediaListParams.keywordParam.publishingPeriod.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === mediaListParams.keywordParam.publishingPeriod.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.mediaType' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'publishingPeriod', mediaDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {mediaListParams.additionalParam.journalistTargetList &&
            mediaListParams.additionalParam.journalistTargetList.length > 0 && (
              <>
                <div className="header-tags__tit">언론인 목록</div>
                {mediaListParams.additionalParam &&
                  mediaListParams.additionalParam.journalistTargetList.length > 0 &&
                  mediaListParams.additionalParam.journalistTargetList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === mediaListParams.additionalParam.journalistTargetList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.mediaType' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() =>
                          setMediaTagDeleteControlSearch(e, mediaListParams, 'journalistTargetList', mediaDto)
                        }
                      />
                    </div>
                  ))}
              </>
            )}
          {mediaListParams.additionalParam.portal && mediaListParams.additionalParam.portal.length > 0 && (
            <>
              <div className="header-tags__tit">포털 제휴</div>
              {mediaListParams.additionalParam &&
                mediaListParams.additionalParam.portal.length > 0 &&
                mediaListParams.additionalParam.portal.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === mediaListParams.additionalParam.portal.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setMediaTagDeleteControlSearch(e, mediaListParams, 'portal', mediaDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {mediaListParams.additionalParam.languageParam && mediaListParams.additionalParam.languageParam.id !== '' && (
            <>
              <div className="header-tags__tit">언어</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.languageParam.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'languageParam', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.additionalParam.isJournalist && mediaListParams.additionalParam.isJournalist.id !== '' && (
            <>
              <div className="header-tags__tit">기자명 노출</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.isJournalist.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'isJournalist', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.additionalParam.system && mediaListParams.additionalParam.system.id !== '' && (
            <>
              <div className="header-tags__tit">정보 유형</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.system.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'system', mediaDto)}
                />
              </div>
            </>
          )}
          {mediaListParams.additionalParam.limit && mediaListParams.additionalParam.limit.id !== '' && (
            <>
              <div className="header-tags__tit">차단 여부</div>
              <div className={`header-tags__tag is-finished'`}>
                <Tag
                  label={mediaListParams.additionalParam.limit.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setMediaTagControlSearch(mediaListParams, 'limit', mediaDto)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default SearchOption
