import { Fragment, useEffect, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentItem from '~/components/contents/pressMedia/SavedSearch/MiddleContent/Press/Content/ContentItem'
import { useDebounce } from '~/utils/hooks/common/useDebounce'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressContent = () => {
  const {
    savedJournalKey,
    journalLoading,
    isSearchedNewsOpen,
    isOwner,
    isFilterSubParam,
    pressDto,
    pressListParams,
    journalApiList,
    pressParamKeyword,
    pressParamKeywordButton,
    setPressParamKeywordButtonAction,
    setPressParamKeywordAction,
    setSearchedNewsOpenActionAction,
    pressKeywordSearch,
  } = useSavedSearch()
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchReset = () => {
    setPressParamKeywordAction('')
    setPressParamKeywordButtonAction(!pressParamKeywordButton)
    pressKeywordSearch('', pressDto, pressListParams, savedJournalKey, isOwner, isFilterSubParam)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [journalLoading])

  return (
    <>
      {pressParamKeywordButton && (
        <div
          className="search-result__search"
          // style={{ padding: 12 }}
        >
          <FormInputSearch
            placeholder={'검색'}
            value={pressParamKeyword}
            onChange={e => setPressParamKeywordAction(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' &&
              pressKeywordSearch(
                pressParamKeyword,
                pressDto,
                pressListParams,
                savedJournalKey,
                isOwner,
                isFilterSubParam
              )
            }
            onDeleteButtonClick={() => setPressParamKeywordAction('')}
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
          {/* <ul className="interval-mt12"> */}
          <ul>
            {pressListParams.keywordParam.newsKeywordValue && pressListParams.keywordParam.newsKeywordValue !== '' && (
              <li>
                <div className="search-result__toggle">
                  <FormInputToggle
                    id="search-result__toggle__toggle"
                    name="search-result__toggle__toggle"
                    label="검색된 뉴스 펼치기"
                    reverse={true}
                    checked={isSearchedNewsOpen}
                    onChange={() => setSearchedNewsOpenActionAction(!isSearchedNewsOpen)}
                  />
                </div>
              </li>
            )}
            <li>
              <div className="search-result__list">
                <div className="list-type2__section">
                  {journalLoading ? (
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
                      {journalApiList && journalApiList.length > 0 ? (
                        <Fragment>
                          {journalApiList &&
                            journalApiList.map(e => (
                              <ContentItem
                                key={'list-type5-list-type8__group' + 'journalApiList' + e.jrnlst_id}
                                {...e}
                              />
                            ))}
                        </Fragment>
                      ) : (
                        <div className="search-result__nodata">
                          <p className="font-body__regular">검색 결과가 없습니다.</p>
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

export default PressContent
