import { Fragment, useEffect, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentItem from '~/components/contents/pressMedia/SearchResult/Media/MiddleContent/Content/ContentItem'
import { useDebounce } from '~/utils/hooks/common/useDebounce'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const Content = () => {
  const {
    mediaLoading,
    mediaDto,
    mediaListParams,
    mediaApiList,
    mediaParamKeyword,
    mediaParamKeywordButton,
    setMediaParamKeywordButtonAction,
    setMediaParamKeywordAction,
    mediaKeywordSearch,
    moveToMediaResearch,
  } = usePressMediaSearchResult()
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchReset = () => {
    setMediaParamKeywordAction('')
    setMediaParamKeywordButtonAction(!mediaParamKeywordButton)
    mediaKeywordSearch('', mediaDto, mediaListParams)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [mediaLoading])

  return (
    <>
      {mediaParamKeywordButton && (
        <div
          className="search-result__search"
          // style={{ padding: 12 }}
        >
          <FormInputSearch
            placeholder={'검색'}
            value={mediaParamKeyword}
            onChange={e => setMediaParamKeywordAction(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && mediaKeywordSearch(mediaParamKeyword, mediaDto, mediaListParams)}
            onDeleteButtonClick={() => setMediaParamKeywordAction('')}
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
                <div className="list-type2__section">
                  {mediaLoading ? (
                    <ul className="list-type2__group">
                      {Array.from({ length: 20 }).map((e, index) => (
                        <li key={'list-type2__group' + 'searchContentList' + index}>
                          {/*<div*/}
                          {/*  className="list-type2__item"*/}
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
                    <ul className="list-type2__group">
                      {mediaApiList && mediaApiList.length > 0 ? (
                        <Fragment>
                          {mediaApiList &&
                            mediaApiList.map(e => (
                              <ContentItem
                                key={'list-type5-list-type8__group' + 'mediaApiList' + e.mid}
                                {...e}
                              />
                            ))}
                        </Fragment>
                      ) : (
                        <div className="search-result__nodata">
                          <p className="font-body__regular">검색 결과가 없습니다.</p>
                          <Button
                            label={'다시 검색하기'}
                            cate={'default'}
                            size={'m'}
                            color={'tertiary'}
                            onClick={() => moveToMediaResearch(mediaListParams)}
                          />
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
