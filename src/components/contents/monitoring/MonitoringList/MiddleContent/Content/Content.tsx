import { Fragment, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Loader from '~/components/common/ui/Loader'
import ContentItem from '~/components/contents/monitoring/MonitoringList/MiddleContent/Content/ContentsItem'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const Content = () => {
  const {
    isOwner,
    isFilterSubParam,
    newsLoading,
    monitoringCategoryButton,
    newsList,
    monitoringListParams,
    monitoringListParamKeyword,
    monitoringParams,
    monitoringDate,
    setMonitoringListParamKeywordActionAction,
    monitoringCategoryData,
    setMonitoringCategoryButtonAction,
    keywordSearch,
  } = useMonitoringSearch()
  const scrollRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [showLoader, setShowLoader] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const searchReset = () => {
    setMonitoringListParamKeywordActionAction('')
    setMonitoringCategoryButtonAction(!monitoringCategoryButton)
    monitoringCategoryData &&
      keywordSearch(
        '',
        monitoringListParams,
        monitoringParams,
        monitoringDate,
        monitoringCategoryData,
        isOwner,
        isFilterSubParam
      )
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
      setShowContent(false)
    } else {
      clearTimeout(timer)
      setShowLoader(false)
      timer = setTimeout(() => {
        setShowContent(true)
      }, 500)
    }
    return () => clearTimeout(timer)
  }, [newsLoading])

  useEffect(() => {
    if (scrollRef && scrollRef.current && loaderRef.current) {
      const { width, height } = scrollRef.current.getBoundingClientRect()
      loaderRef.current.style.width = `${width}px`
      loaderRef.current.style.height = `${height}px`
    }
  }, [])

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
              monitoringCategoryData &&
              e.key === 'Enter' &&
              keywordSearch(
                monitoringListParamKeyword,
                monitoringListParams,
                monitoringParams,
                monitoringDate,
                monitoringCategoryData,
                isOwner,
                isFilterSubParam
              )
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
        <div
          ref={loaderRef}
          className={cn('loader-ref', { show: showLoader })}
        >
          <Loader height={'100%'} />
        </div>
        {showContent && (
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
