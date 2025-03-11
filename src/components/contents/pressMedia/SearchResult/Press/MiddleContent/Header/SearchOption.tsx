import { useEffect, useState } from 'react'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tag from '~/components/common/ui/Tag'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const SearchOption = () => {
  const {
    pressListParams,
    pressDto,
    pressParamsExpandButton,
    setPressParamsExpandButtonAction,
    setPressTagControlSearch,
    setPressTagDeleteControlSearch,
  } = usePressMediaSearchResult()
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const headerElement = document.getElementById('pressListParams_disable_div')
    if (headerElement) {
      console.log('headerElement', headerElement.clientHeight)
      setHeaderHeight(headerElement.clientHeight)
    }
  }, [pressListParams])

  return (
    <li>
      <div
        className={'search-result__header-tags mt-12 display-flex'}
        style={{ height: headerHeight === 0 ? 42 : !pressParamsExpandButton ? 42 : 'unset' }}
      >
        <div className="header-tags__group">
          {pressListParams.keywordParam.journalistTagList &&
            pressListParams.keywordParam.journalistTagList.length > 0 && (
              <>
                <div className="header-tags__tit">이름</div>
                {pressListParams.keywordParam &&
                  pressListParams.keywordParam.journalistTagList.length > 0 &&
                  pressListParams.keywordParam.journalistTagList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.keywordParam.journalistTagList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.journalistTagList' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() =>
                          setPressTagDeleteControlSearch(e, pressListParams, 'journalistTagList', pressDto)
                        }
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.keywordParam.newsKeywordValue && pressListParams.keywordParam.newsKeywordValue !== '' && (
            <>
              <div className="header-tags__tit">뉴스</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.keywordParam.newsKeywordValue}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'newsKeywordValue', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.keywordParam.field && pressListParams.keywordParam.field.length > 0 && (
            <>
              <div className="header-tags__tit">분야</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.field.length > 0 &&
                pressListParams.keywordParam.field.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.field.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.field' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'field', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.area && pressListParams.keywordParam.area.length > 0 && (
            <>
              <div className="header-tags__tit">지역</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.area.length > 0 &&
                pressListParams.keywordParam.area.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.area.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.area' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'area', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.mediaTagList && pressListParams.keywordParam.mediaTagList.length > 0 && (
            <>
              <div className="header-tags__tit">매체명</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.mediaTagList.length > 0 &&
                pressListParams.keywordParam.mediaTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.mediaTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaTagList' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaTagList', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.mediaType && pressListParams.keywordParam.mediaType.length > 0 && (
            <>
              <div className="header-tags__tit">매체 유형</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.mediaType.length > 0 &&
                pressListParams.keywordParam.mediaType.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.mediaType.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaType', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.occupation && pressListParams.keywordParam.occupation.length > 0 && (
            <>
              <div className="header-tags__tit">직종</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.occupation.length > 0 &&
                pressListParams.keywordParam.occupation.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.occupation.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.occupation' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'occupation', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.position && pressListParams.keywordParam.position.length > 0 && (
            <>
              <div className="header-tags__tit">직책</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.position.length > 0 &&
                pressListParams.keywordParam.position.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.position.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.position' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'position', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.keyword && pressListParams.keywordParam.keyword.length > 0 && (
            <>
              <div className="header-tags__tit">키워드</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.keyword.length > 0 &&
                pressListParams.keywordParam.keyword.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.keyword.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.keyword' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'keyword', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.department && pressListParams.keywordParam.department.length > 0 && (
            <>
              <div className="header-tags__tit">부서</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.department.length > 0 &&
                pressListParams.keywordParam.department.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.department.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'department', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.informationType && pressListParams.keywordParam.informationType.id !== '' && (
            <>
              <div className="header-tags__tit">매체 지수</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.keywordParam.informationType.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'informationType', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.keywordParam.publishingPeriod &&
            pressListParams.keywordParam.publishingPeriod.length > 0 && (
              <>
                <div className="header-tags__tit">발행 주기</div>
                {pressListParams.keywordParam &&
                  pressListParams.keywordParam.publishingPeriod.length > 0 &&
                  pressListParams.keywordParam.publishingPeriod.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.keywordParam.publishingPeriod.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.department' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'publishingPeriod', pressDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.additionalParam.mediaTargetList &&
            pressListParams.additionalParam.mediaTargetList.length > 0 && (
              <>
                <div className="header-tags__tit">미디어 목록</div>
                {pressListParams.additionalParam &&
                  pressListParams.additionalParam.mediaTargetList.length > 0 &&
                  pressListParams.additionalParam.mediaTargetList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.additionalParam.mediaTargetList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.department' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaTargetList', pressDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.additionalParam.mediaField && pressListParams.additionalParam.mediaField.length > 0 && (
            <>
              <div className="header-tags__tit">매체 분야</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.mediaField.length > 0 &&
                pressListParams.additionalParam.mediaField.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.mediaField.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaField', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.mediaArea && pressListParams.additionalParam.mediaArea.length > 0 && (
            <>
              <div className="header-tags__tit">매체 지역</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.mediaArea.length > 0 &&
                pressListParams.additionalParam.mediaArea.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.mediaArea.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaArea', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.mediaGroupList &&
            pressListParams.additionalParam.mediaGroupList.length > 0 && (
              <>
                <div className="header-tags__tit">매체 그룹</div>
                {pressListParams.additionalParam &&
                  pressListParams.additionalParam.mediaGroupList.length > 0 &&
                  pressListParams.additionalParam.mediaGroupList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.additionalParam.mediaGroupList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.department' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaGroupList', pressDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.additionalParam.portal && pressListParams.additionalParam.portal.length > 0 && (
            <>
              <div className="header-tags__tit">포털 제휴</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.portal.length > 0 &&
                pressListParams.additionalParam.portal.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.portal.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'portal', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.social && pressListParams.additionalParam.social.length > 0 && (
            <>
              <div className="header-tags__tit">소셜 미디어</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.social.length > 0 &&
                pressListParams.additionalParam.social.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.social.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'social', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.languageParam && pressListParams.additionalParam.languageParam.id !== '' && (
            <>
              <div className="header-tags__tit">언어</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.languageParam.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'languageParam', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.additionalParam.count && pressListParams.additionalParam.count.id !== '' && (
            <>
              <div className="header-tags__tit">소속 매체수</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.count.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'count', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.additionalParam.system && pressListParams.additionalParam.system.id !== '' && (
            <>
              <div className="header-tags__tit">정보 유형</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.system.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'system', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.additionalParam.limit && pressListParams.additionalParam.limit.id !== '' && (
            <>
              <div className="header-tags__tit">차단 여부</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.limit.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'limit', pressDto)}
                />
              </div>
            </>
          )}
        </div>
        {headerHeight > 42 && (
          <div
            className="header-tags__button"
            onClick={() => setPressParamsExpandButtonAction(!pressParamsExpandButton)}
          >
            <button type="button">
              <IcoSvg data={!pressParamsExpandButton ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
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
          id="pressListParams_disable_div"
          className="header-tags__group"
        >
          {pressListParams.keywordParam.journalistTagList &&
            pressListParams.keywordParam.journalistTagList.length > 0 && (
              <>
                <div className="header-tags__tit">이름</div>
                {pressListParams.keywordParam &&
                  pressListParams.keywordParam.journalistTagList.length > 0 &&
                  pressListParams.keywordParam.journalistTagList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.keywordParam.journalistTagList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.journalistTagList' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() =>
                          setPressTagDeleteControlSearch(e, pressListParams, 'journalistTagList', pressDto)
                        }
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.keywordParam.newsKeywordValue && pressListParams.keywordParam.newsKeywordValue !== '' && (
            <>
              <div className="header-tags__tit">뉴스</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.keywordParam.newsKeywordValue}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'newsKeywordValue', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.keywordParam.field && pressListParams.keywordParam.field.length > 0 && (
            <>
              <div className="header-tags__tit">분야</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.field.length > 0 &&
                pressListParams.keywordParam.field.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.field.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.field' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'field', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.area && pressListParams.keywordParam.area.length > 0 && (
            <>
              <div className="header-tags__tit">지역</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.area.length > 0 &&
                pressListParams.keywordParam.area.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.area.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.area' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'area', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.mediaTagList && pressListParams.keywordParam.mediaTagList.length > 0 && (
            <>
              <div className="header-tags__tit">매체명</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.mediaTagList.length > 0 &&
                pressListParams.keywordParam.mediaTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.mediaTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaTagList' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaTagList', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.mediaType && pressListParams.keywordParam.mediaType.length > 0 && (
            <>
              <div className="header-tags__tit">매체 유형</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.mediaType.length > 0 &&
                pressListParams.keywordParam.mediaType.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.mediaType.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaType', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.occupation && pressListParams.keywordParam.occupation.length > 0 && (
            <>
              <div className="header-tags__tit">직종</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.occupation.length > 0 &&
                pressListParams.keywordParam.occupation.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.occupation.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.occupation' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'occupation', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.position && pressListParams.keywordParam.position.length > 0 && (
            <>
              <div className="header-tags__tit">직책</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.position.length > 0 &&
                pressListParams.keywordParam.position.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.position.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.position' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'position', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.keyword && pressListParams.keywordParam.keyword.length > 0 && (
            <>
              <div className="header-tags__tit">키워드</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.keyword.length > 0 &&
                pressListParams.keywordParam.keyword.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.keyword.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.keyword' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'keyword', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.department && pressListParams.keywordParam.department.length > 0 && (
            <>
              <div className="header-tags__tit">부서</div>
              {pressListParams.keywordParam &&
                pressListParams.keywordParam.department.length > 0 &&
                pressListParams.keywordParam.department.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.keywordParam.department.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'department', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.keywordParam.informationType && pressListParams.keywordParam.informationType.id !== '' && (
            <>
              <div className="header-tags__tit">매체 지수</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.keywordParam.informationType.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'informationType', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.keywordParam.publishingPeriod &&
            pressListParams.keywordParam.publishingPeriod.length > 0 && (
              <>
                <div className="header-tags__tit">발행 주기</div>
                {pressListParams.keywordParam &&
                  pressListParams.keywordParam.publishingPeriod.length > 0 &&
                  pressListParams.keywordParam.publishingPeriod.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.keywordParam.publishingPeriod.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.department' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'publishingPeriod', pressDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.additionalParam.mediaTargetList &&
            pressListParams.additionalParam.mediaTargetList.length > 0 && (
              <>
                <div className="header-tags__tit">미디어 목록</div>
                {pressListParams.additionalParam &&
                  pressListParams.additionalParam.mediaTargetList.length > 0 &&
                  pressListParams.additionalParam.mediaTargetList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.additionalParam.mediaTargetList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.department' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaTargetList', pressDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.additionalParam.mediaField && pressListParams.additionalParam.mediaField.length > 0 && (
            <>
              <div className="header-tags__tit">매체 분야</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.mediaField.length > 0 &&
                pressListParams.additionalParam.mediaField.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.mediaField.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaField', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.mediaArea && pressListParams.additionalParam.mediaArea.length > 0 && (
            <>
              <div className="header-tags__tit">매체 지역</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.mediaArea.length > 0 &&
                pressListParams.additionalParam.mediaArea.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.mediaArea.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaArea', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.mediaGroupList &&
            pressListParams.additionalParam.mediaGroupList.length > 0 && (
              <>
                <div className="header-tags__tit">매체 그룹</div>
                {pressListParams.additionalParam &&
                  pressListParams.additionalParam.mediaGroupList.length > 0 &&
                  pressListParams.additionalParam.mediaGroupList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === pressListParams.additionalParam.mediaGroupList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.department' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                        onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'mediaGroupList', pressDto)}
                      />
                    </div>
                  ))}
              </>
            )}
          {pressListParams.additionalParam.portal && pressListParams.additionalParam.portal.length > 0 && (
            <>
              <div className="header-tags__tit">포털 제휴</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.portal.length > 0 &&
                pressListParams.additionalParam.portal.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.portal.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'portal', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.social && pressListParams.additionalParam.social.length > 0 && (
            <>
              <div className="header-tags__tit">소셜 미디어</div>
              {pressListParams.additionalParam &&
                pressListParams.additionalParam.social.length > 0 &&
                pressListParams.additionalParam.social.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === pressListParams.additionalParam.social.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.department' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() => setPressTagDeleteControlSearch(e, pressListParams, 'social', pressDto)}
                    />
                  </div>
                ))}
            </>
          )}
          {pressListParams.additionalParam.languageParam && pressListParams.additionalParam.languageParam.id !== '' && (
            <>
              <div className="header-tags__tit">언어</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.languageParam.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'languageParam', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.additionalParam.count && pressListParams.additionalParam.count.id !== '' && (
            <>
              <div className="header-tags__tit">소속 매체수</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.count.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'count', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.additionalParam.system && pressListParams.additionalParam.system.id !== '' && (
            <>
              <div className="header-tags__tit">정보 유형</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.system.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'system', pressDto)}
                />
              </div>
            </>
          )}
          {pressListParams.additionalParam.limit && pressListParams.additionalParam.limit.id !== '' && (
            <>
              <div className="header-tags__tit">차단 여부</div>
              <div className="header-tags__tag">
                <Tag
                  label={pressListParams.additionalParam.limit.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() => setPressTagControlSearch(pressListParams, 'limit', pressDto)}
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
