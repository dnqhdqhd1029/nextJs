import { useEffect, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentItem from '~/components/contents/activity/tag/TagContent/ContentItem'
import { useTagActivity } from '~/utils/hooks/contents/activity/useTagActivity'

const TagContent = () => {
  const {
    tagContentListButton,
    tagType,
    tagListParams,
    isLoading,
    tagContentList,
    tagListParamsKeyword,
    setTagContentListButtonAction,
    tagListParamsKeywordActionChange,
    getSearchActionByKeyword,
  } = useTagActivity()
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchReset = () => {
    tagListParamsKeywordActionChange('')
    setTagContentListButtonAction(!tagContentListButton)
    getSearchActionByKeyword('', tagListParams, tagType)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [isLoading])

  return (
    <>
      {tagContentListButton && (
        <div
          className="search-result__search"
          // style={{ padding: 12 }}
        >
          <FormInputSearch
            placeholder={'검색'}
            value={tagListParamsKeyword}
            onChange={e => tagListParamsKeywordActionChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && getSearchActionByKeyword(tagListParamsKeyword, tagListParams, tagType)}
            onDeleteButtonClick={() => tagListParamsKeywordActionChange('')}
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
                <div className="list-type4__section">
                  {isLoading ? (
                    <ul className="list-type4__group">
                      {Array.from({ length: 20 }).map((e, index) => (
                        <li key={'list-type4-item__section' + 'searchContentList' + index}>
                          {/*<div className={'list-type4-item__section'}>*/}
                          {/*  <Skeleton*/}
                          {/*    key={10}*/}
                          {/*    width={'100%'}*/}
                          {/*  />*/}
                          {/*</div>*/}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-type4__group">
                      {tagContentList && tagContentList.length > 0 ? (
                        tagContentList.map((e, index) => (
                          <ContentItem
                            item={e}
                            key={'list-type4-item__section' + 'searchContentList' + e.tagId}
                          />
                        ))
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

export default TagContent
