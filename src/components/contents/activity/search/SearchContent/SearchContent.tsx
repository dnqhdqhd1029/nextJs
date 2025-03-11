import { Fragment, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentItem from '~/components/contents/activity/search/SearchContent/ContentItem'
import { useDebounce } from '~/utils/hooks/common/useDebounce'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const SearchContent = () => {
  const {
    apiParams,
    activityList,
    searchContentLoading,
    activityParamKeyword,
    activityParamKeywordButton,
    setActivityParamKeywordActionActions,
    setActivityParamKeywordButtonActions,
    getSearchActionByKeyword,
  } = useActivityList()
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchReset = () => {
    setActivityParamKeywordActionActions('')
    setActivityParamKeywordButtonActions(!activityParamKeywordButton)
    getSearchActionByKeyword('', apiParams)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [searchContentLoading])

  return (
    <>
      {activityParamKeywordButton && (
        <div
          className="search-result__search"
          // style={{ padding: 12 }}
        >
          <FormInputSearch
            placeholder={'검색'}
            value={activityParamKeyword}
            onChange={e => setActivityParamKeywordActionActions(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && getSearchActionByKeyword(activityParamKeyword, apiParams)}
            onDeleteButtonClick={() => setActivityParamKeywordActionActions('')}
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
                <div className="list-type5__section">
                  {searchContentLoading ? (
                    <ul className="list-type5__group">
                      {Array.from({ length: 20 }).map((e, index) => (
                        <li key={'list-type5-item__section' + 'searchContentList' + index}>
                          {/*<div className={'list-type5-item__section'}>*/}
                          {/*  <Skeleton*/}
                          {/*    key={10}*/}
                          {/*    width={'100%'}*/}
                          {/*  />*/}
                          {/*</div>*/}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-type5__group">
                      {activityList && activityList.length > 0 ? (
                        <Fragment>
                          {activityList &&
                            activityList.map((e, index) => (
                              <ContentItem
                                {...e}
                                key={'list-type5-item__section' + 'searchContentList' + e.actionId}
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

export default SearchContent
