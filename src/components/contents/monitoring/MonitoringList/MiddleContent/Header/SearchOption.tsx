import { Fragment, useEffect, useState } from 'react'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tag from '~/components/common/ui/Tag'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const SearchOption = () => {
  const {
    isOwner,
    isFilterSubParam,
    monitoringDate,
    monitoringParams,
    monitoringListParams,
    monitoringCategoryData,
    monitoringParamsExpandButton,
    setMonitoringParamsExpandButtonAction,
    setTagDeleteControlSearch,
    setTagControlSearch,
  } = useMonitoringSearch()
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const headerElement = document.getElementById('monitoringParams_disable_div')
    if (headerElement) {
      console.log('headerElement', headerElement.clientHeight)
      setHeaderHeight(headerElement.clientHeight)
    }
  }, [monitoringParams])

  return (
    <li>
      <div
        className={'search-result__header-tags mt-12 display-flex'}
        style={{ height: headerHeight === 0 ? 42 : !monitoringParamsExpandButton ? 42 : 'unset' }}
      >
        <div className="header-tags__group">
          {monitoringParams.and && monitoringParams.and !== '' && (
            <>
              <div className="header-tags__tit">모두 포함</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.and}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'and',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.or && monitoringParams.or !== '' && (
            <>
              <div className="header-tags__tit">하나라도 포함</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.or}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'or',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.not && monitoringParams.not !== '' && (
            <>
              <div className="header-tags__tit">제외</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.not}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'not',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.mediaType && monitoringParams.mediaType.length > 0 && (
            <>
              <div className="header-tags__tit">매체 유형</div>
              {monitoringParams &&
                monitoringParams.mediaType.length > 0 &&
                monitoringParams.mediaType.map((e, index) => (
                  <div
                    className={`header-tags__tag ${index === monitoringParams.mediaType.length ? 'is-finished' : ''}`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'mediaType',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.mediaValue && monitoringParams.mediaValue.id !== '' && (
            <>
              <div className="header-tags__tit">매체 지수</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.mediaValue.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'mediaValue',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.mediaTagList && monitoringParams.mediaTagList.length > 0 && (
            <>
              <div className="header-tags__tit">매체명</div>
              {monitoringParams &&
                monitoringParams.mediaTagList.length > 0 &&
                monitoringParams.mediaTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.mediaTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaTagList' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'mediaTagList',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.journalistTagList && monitoringParams.journalistTagList.length > 0 && (
            <>
              <div className="header-tags__tit">저자</div>
              {monitoringParams &&
                monitoringParams.journalistTagList.length > 0 &&
                monitoringParams.journalistTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.journalistTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.journalistTagList' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'journalistTagList',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.tone && monitoringParams.tone.length > 0 && (
            <>
              <div className="header-tags__tit">논조</div>
              {monitoringParams &&
                monitoringParams.tone.length > 0 &&
                monitoringParams.tone.map((e, index) => (
                  <div
                    className={`header-tags__tag ${index === monitoringParams.tone.length ? 'is-finished' : ''}`}
                    key={'monitoringParams.tone' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'tone',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.existMultimedia && monitoringParams.existMultimedia.length > 0 && (
            <>
              <div className="header-tags__tit">멀티미디어</div>
              {monitoringParams &&
                monitoringParams.existMultimedia.length > 0 &&
                monitoringParams.existMultimedia.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.existMultimedia.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.existMultimedia' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'existMultimedia',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.tag && monitoringParams.tag.length > 0 && (
            <>
              <div className="header-tags__tit">태그</div>
              {monitoringParams &&
                monitoringParams.tag.length > 0 &&
                monitoringParams.tag.map((e, index) => (
                  <div
                    className={`header-tags__tag ${index === monitoringParams.tag.length ? 'is-finished' : ''}`}
                    key={'monitoringParams.tag' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'tag',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.url && monitoringParams.url !== '' && (
            <>
              <div className="header-tags__tit">URL</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.url}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'url',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.publishingPeriod && monitoringParams.publishingPeriod.length > 0 && (
            <>
              <div className="header-tags__tit">발행주기</div>
              {monitoringParams &&
                monitoringParams.publishingPeriod.length > 0 &&
                monitoringParams.publishingPeriod.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.publishingPeriod.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.publishingPeriod' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'publishingPeriod',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.mediaBookList && monitoringParams.mediaBookList.length > 0 && (
            <>
              <div className="header-tags__tit">매체 리스트</div>
              {monitoringParams &&
                monitoringParams.mediaBookList.length > 0 &&
                monitoringParams.mediaBookList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.mediaBookList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaBookList' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'mediaBookList',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.clipbook && monitoringParams.clipbook.id !== '' && (
            <>
              <div className="header-tags__tit">클립북</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.clipbook.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'clipbook',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.clipbookValue && monitoringParams.clipbookValue.length > 0 && (
            <>
              <div className="header-tags__tit">클립북 목록</div>
              {monitoringParams &&
                monitoringParams.clipbookValue.length > 0 &&
                monitoringParams.clipbookValue.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.clipbookValue.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.clipbookValue' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'clipbookValue',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.coverage && monitoringParams.coverage.id !== '' && (
            <>
              <div className="header-tags__tit">커버리지</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.coverage.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'coverage',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.informationType && monitoringParams.informationType.id !== '' && (
            <>
              <div className="header-tags__tit">정보 유형</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.informationType.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'informationType',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
        </div>
        {headerHeight > 42 && (
          <div
            className="header-tags__button"
            onClick={() => setMonitoringParamsExpandButtonAction(!monitoringParamsExpandButton)}
          >
            <button type="button">
              <IcoSvg data={!monitoringParamsExpandButton ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
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
          id="monitoringParams_disable_div"
          className="header-tags__group"
        >
          {monitoringParams.and && monitoringParams.and !== '' && (
            <>
              <div className="header-tags__tit">모두 포함</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.and}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'and',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.or && monitoringParams.or !== '' && (
            <>
              <div className="header-tags__tit">하나라도 포함</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.or}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'or',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.not && monitoringParams.not !== '' && (
            <>
              <div className="header-tags__tit">제외</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.not}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'not',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.mediaType && monitoringParams.mediaType.length > 0 && (
            <>
              <div className="header-tags__tit">매체 유형</div>
              {monitoringParams &&
                monitoringParams.mediaType.length > 0 &&
                monitoringParams.mediaType.map((e, index) => (
                  <div
                    className={`header-tags__tag ${index === monitoringParams.mediaType.length ? 'is-finished' : ''}`}
                    key={'monitoringParams.mediaType' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'mediaType',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.mediaValue && monitoringParams.mediaValue.id !== '' && (
            <>
              <div className="header-tags__tit">매체 지수</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.mediaValue.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'mediaValue',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.mediaTagList && monitoringParams.mediaTagList.length > 0 && (
            <>
              <div className="header-tags__tit">매체명</div>
              {monitoringParams &&
                monitoringParams.mediaTagList.length > 0 &&
                monitoringParams.mediaTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.mediaTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaTagList' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'mediaTagList',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.journalistTagList && monitoringParams.journalistTagList.length > 0 && (
            <>
              <div className="header-tags__tit">저자</div>
              {monitoringParams &&
                monitoringParams.journalistTagList.length > 0 &&
                monitoringParams.journalistTagList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.journalistTagList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.journalistTagList' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'journalistTagList',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.tone && monitoringParams.tone.length > 0 && (
            <>
              <div className="header-tags__tit">논조</div>
              {monitoringParams &&
                monitoringParams.tone.length > 0 &&
                monitoringParams.tone.map((e, index) => (
                  <div
                    className={`header-tags__tag ${index === monitoringParams.tone.length ? 'is-finished' : ''}`}
                    key={'monitoringParams.tone' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'tone',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.tag && monitoringParams.tag.length > 0 && (
            <>
              <div className="header-tags__tit">태그</div>
              {monitoringParams &&
                monitoringParams.tag.length > 0 &&
                monitoringParams.tag.map((e, index) => (
                  <div
                    className={`header-tags__tag ${index === monitoringParams.tag.length ? 'is-finished' : ''}`}
                    key={'monitoringParams.tag' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'tag',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.url && monitoringParams.url !== '' && (
            <>
              <div className="header-tags__tit">URL</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.url}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'url',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.publishingPeriod && monitoringParams.publishingPeriod.length > 0 && (
            <>
              <div className="header-tags__tit">발행주기</div>
              {monitoringParams &&
                monitoringParams.publishingPeriod.length > 0 &&
                monitoringParams.publishingPeriod.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.publishingPeriod.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.publishingPeriod' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'publishingPeriod',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.mediaBookList && monitoringParams.mediaBookList.length > 0 && (
            <>
              <div className="header-tags__tit">미디어 목록</div>
              {monitoringParams &&
                monitoringParams.mediaBookList.length > 0 &&
                monitoringParams.mediaBookList.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.mediaBookList.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.mediaBookList' + e.id}
                  >
                    <Tag
                      label={e.subData}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'mediaBookList',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.clipbook && monitoringParams.clipbook.id !== '' && (
            <>
              <div className="header-tags__tit">클립북</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.clipbook.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'clipbook',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.clipbookValue && monitoringParams.clipbookValue.length > 0 && (
            <>
              <div className="header-tags__tit">클립북 목록</div>
              {monitoringParams &&
                monitoringParams.clipbookValue.length > 0 &&
                monitoringParams.clipbookValue.map((e, index) => (
                  <div
                    className={`header-tags__tag ${
                      index === monitoringParams.clipbookValue.length ? 'is-finished' : ''
                    }`}
                    key={'monitoringParams.clipbookValue' + e.id}
                  >
                    <Tag
                      label={e.label}
                      cate={'n2'}
                      shape={'round'}
                      close={true}
                      onClose={() =>
                        monitoringCategoryData &&
                        setTagControlSearch(
                          e,
                          monitoringParams,
                          'clipbookValue',
                          monitoringListParams,
                          monitoringDate,
                          monitoringCategoryData,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  </div>
                ))}
            </>
          )}
          {monitoringParams.coverage && monitoringParams.coverage.id !== '' && (
            <>
              <div className="header-tags__tit">커버리지</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.coverage.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'coverage',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
                />
              </div>
            </>
          )}
          {monitoringParams.informationType && monitoringParams.informationType.id !== '' && (
            <>
              <div className="header-tags__tit">정보 유형</div>
              <div className="header-tags__tag">
                <Tag
                  label={monitoringParams.informationType.name}
                  cate={'n2'}
                  shape={'round'}
                  close={true}
                  onClose={() =>
                    monitoringCategoryData &&
                    setTagDeleteControlSearch(
                      monitoringParams,
                      'informationType',
                      monitoringListParams,
                      monitoringDate,
                      monitoringCategoryData,
                      isOwner,
                      isFilterSubParam
                    )
                  }
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
