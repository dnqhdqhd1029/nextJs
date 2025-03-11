import { useEffect, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentItem from '~/components/contents/monitoring/Management/Content/ContentItem'
import { useMonitoringManagement } from '~/utils/hooks/contents/monitoring/useManagement'

const Content = () => {
  const {
    isLoading,
    managementContentList,
    managementListParamsContext,
    managementContentListButton,
    managementListParams,
    setManagementContentListButtonAction,
    managementListParamsContextChange,
    getSearchActionByKeyword,
  } = useMonitoringManagement()
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchReset = () => {
    managementListParamsContextChange('')
    setManagementContentListButtonAction(!managementContentListButton)
    getSearchActionByKeyword('', managementListParams)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [isLoading])

  return (
    <>
      {managementContentListButton && (
        <div
          className="search-result__search"
          // style={{ padding: 12 }}
        >
          <FormInputSearch
            placeholder={'검색'}
            value={managementListParamsContext}
            onChange={e => managementListParamsContextChange(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' && getSearchActionByKeyword(managementListParamsContext, managementListParams)
            }
            onDeleteButtonClick={() => managementListParamsContextChange('')}
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
                      {managementContentList && managementContentList.length > 0 ? (
                        managementContentList.map((e, index) => (
                          <ContentItem
                            {...e}
                            key={'list-type4-item__section' + 'searchContentList' + e.newsSrchId}
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

export default Content
