import { Fragment, useEffect, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentItem from '~/components/contents/monitoring/Clipbook/Result/MiddleContent/Content/ContentsItem'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const Content = () => {
  const {
    newsLoading,
    newsList,
    monitoringCategoryButton,
    clipbookIdKey,
    newsKeyword,
    monitoringListParams,
    setMonitoringCategoryButtonAction,
    setNewsKeyword,
    isOwner,
    isFilterSubParam,
    keywordSearch,
  } = useClipbookDetail()
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchReset = () => {
    setNewsKeyword('')
    setMonitoringCategoryButtonAction(!monitoringCategoryButton)
    keywordSearch('', monitoringListParams, clipbookIdKey, isOwner, isFilterSubParam)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
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
            value={newsKeyword}
            onChange={e => setNewsKeyword(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' &&
              keywordSearch(newsKeyword, monitoringListParams, clipbookIdKey, isOwner, isFilterSubParam)
            }
            onDeleteButtonClick={() => setNewsKeyword('')}
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
        <div className="search-result__contents">
          <ul className="interval-mt12">
            <li>
              <div className="search-result__list">
                <div className="list-type8__section">
                  {newsLoading ? (
                    <ul className="list-type8__group">
                      {Array.from({ length: 20 }).map((e, index) => (
                        <li key={'list-type5-list-type8__group' + 'searchContentList' + index}>
                          {/*<div*/}
                          {/*  className="list-type8-item__section"*/}
                          {/*  style={{ padding: 'unset' }}*/}
                          {/*>*/}
                          {/*  <Skeleton*/}
                          {/*    key={10}*/}
                          {/*    width={'100%'}*/}
                          {/*    height={'99px'}*/}
                          {/*  />*/}
                          {/*</div>*/}
                        </li>
                      ))}
                    </ul>
                  ) : (
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
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Content
