import { Fragment, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Loader from '~/components/common/ui/Loader'
import ContentItem from '~/components/contents/monitoring/SearchResult/MiddleContent/Content/ContentItem'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const Content = () => {
  const {
    newsLoading,
    monitoringCategoryButton,
    newsList,
    monitoringListParams,
    monitoringListParamKeyword,
    monitoringParams,
    setMonitoringListParamKeywordActionAction,
    setMonitoringCategoryButtonAction,
    moveToResearch,
    keywordSearch,
  } = useMonitoringSearchResult()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLoader, setShowLoader] = useState(false)

  const searchReset = () => {
    setMonitoringListParamKeywordActionAction('')
    setMonitoringCategoryButtonAction(!monitoringCategoryButton)
    keywordSearch('', monitoringListParams, monitoringParams)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
    let timer: NodeJS.Timeout | undefined
    if (newsLoading) {
      timer = setTimeout(() => {
        setShowLoader(true)
      }, 1000)
    } else {
      clearTimeout(timer)
      setShowLoader(false)
    }
    return () => clearTimeout(timer)
  }, [newsLoading])
  return (
    <>
      {monitoringCategoryButton && (
        <div
          className="search-result__search"
          // style={{ padding: 12 }}
        >
          <FormInputSearch
            placeholder={'검색'}
            value={monitoringListParamKeyword}
            onChange={e => setMonitoringListParamKeywordActionAction(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' && keywordSearch(monitoringListParamKeyword, monitoringListParams, monitoringParams)
            }
            onDeleteButtonClick={() => setMonitoringListParamKeywordActionAction('')}
          />
          <Button
            label={'정렬'}
            cate={'ico-only'}
            size={'s'}
            color={'transparent'}
            icoLeft={true}
            icoLeftData={icoSvgData.iconCloseButton2}
            icoSize={16}
            onClick={() => searchReset()}
          />
        </div>
      )}
      <div
        className="mb-contents-layout__contents"
        ref={scrollRef}
      >
        {newsLoading ? (
          <Loader
            height={'100%'}
            isHide={!showLoader}
          />
        ) : (
          <div className="search-result__contents">
            <ul className="interval-mt12">
              <li>
                <div className="search-result__list">
                  <div className="list-type8__section">
                    <ul className="list-type8__group">
                      {newsList && newsList.length > 0 ? (
                        <Fragment>
                          {newsList &&
                            newsList.map(e => (
                              <ContentItem
                                key={'list-type5-list-type8__group' + 'newsList' + e.newsid}
                                {...e}
                              />
                            ))}
                        </Fragment>
                      ) : (
                        <div className="search-result__nodata">
                          <p className="font-body__regular">검색된 뉴스가 없습니다.</p>
                          <Button
                            label={'다시 검색하기'}
                            cate={'default'}
                            size={'m'}
                            color={'tertiary'}
                            onClick={() => moveToResearch(monitoringParams)}
                          />
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Content
