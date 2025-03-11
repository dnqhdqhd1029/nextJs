import { ChangeEvent, Fragment, useEffect, useLayoutEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SortFilterList from '~/components/common/ui/SortFilterList'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import CreateNewsAlertsPopup from '~/components/contents/monitoring/Management/Popup/CreateNewsAlertsPopup'
import { defaultSortOptionsByData } from '~/components/contents/setting/NewsAlerts/defaultData'
import { DefaultSettingLinks } from '~/components/contents/setting/System/defaultData'
import NewsAlertsContent from '~/components/contents/setting/System/NewsAlerts/Content/NewsAlertsContent'
import NewsAlertsDeletePopup from '~/components/contents/setting/System/NewsAlerts/Popup/NewsAlertsDeletePopup'
import { newsAlertsSearchParamsProps } from '~/stores/modules/contents/newsAlert/newsAlert'
import { SelectListOptionItem } from '~/types/common'
import { openToast } from '~/utils/common/toast'
import { useNewsAlertsList } from '~/utils/hooks/contents/setting/useNewsAlertsList'

const NewsAlerts = () => {
  const router = useRouter()
  const {
    newsAlertsData,
    newsAlertParamKeyword,
    newsAlertSearchParams,
    newsAlertSettingReceiveNewsAlertChange,
    setNewsAlertParamKeywordAction,
    handleSetSearchParam,
  } = useNewsAlertsList()

  const handleChangePage = (page_num: number, newsAlertSearchParams: newsAlertsSearchParamsProps) => {
    handleSetSearchParam({
      ...newsAlertSearchParams,
      page: page_num,
    })
  }

  const handleChangeSize = (size_num: number, newsAlertSearchParams: newsAlertsSearchParamsProps) => {
    handleSetSearchParam({
      ...newsAlertSearchParams,
      size: size_num,
    })
  }

  const handleCreateNewsAlertLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (newsAlertsData.newsAlertDataList && newsAlertsData.newsAlertDataList.length >= 20) {
      openToast(
        '더 이상 뉴스 알리미를 설정할 수 없습니다. 뉴스 알리미는 개인당 최대 20개까지 설정할 수 있습니다.',
        'warning'
      )
    } else {
      router.push('/news/saved-search-manage')
    }
  }

  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'설정'}
              naviList={DefaultSettingLinks}
              isCustomerInfo={true}
            />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className="setting__contents">
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <h2 className="common-title__title">뉴스 알리미</h2>
                        <div className="common-title__buttons">
                          <a
                            href={''}
                            onClick={handleCreateNewsAlertLink}
                            className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'secondary'}`)}
                          >
                            <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                              알리미 만들기
                            </span>
                            <span
                              className={cn(`button__ico-right button-${'link-text-arrow'}__ico-right`, [
                                `ico-size${'m'}`,
                              ])}
                            >
                              <IcoSvg data={icoSvgData.chevronRight} />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="setting-contents__section">
                    <ul className="interval-mt42">
                      <li>
                        <div className="setting-contents-list__header">
                          <FormInputToggle
                            name="cT100"
                            id="cT100"
                            label="뉴스 알리미 이메일 수신"
                            reverse={true}
                            checked={newsAlertsData.receiveNewsAlert}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              newsAlertSettingReceiveNewsAlertChange(e.target.checked)
                            }
                          />
                          <ul style={{ display: 'flex' }}>
                            <li className="filter">
                              {newsAlertSearchParams.sort && newsAlertSearchParams.sort.length > 0 && (
                                <SortFilterList
                                  sortOptionsByData={defaultSortOptionsByData}
                                  onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) => {
                                    handleSetSearchParam({
                                      ...newsAlertSearchParams,
                                      sort: [`${dataItem.id}!${orderItem.id}`],
                                    })
                                  }}
                                  value={newsAlertSearchParams.sort as string[]}
                                  disabled={!!!newsAlertsData.pageCount.totalCount}
                                />
                              )}
                            </li>
                            <li className="search">
                              <FormInputSearch
                                placeholder={'검색'}
                                value={newsAlertParamKeyword}
                                onChange={e => setNewsAlertParamKeywordAction(e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    handleSetSearchParam({
                                      ...newsAlertSearchParams,
                                      keyword: newsAlertParamKeyword,
                                    })
                                  }
                                }}
                                onDeleteButtonClick={() =>
                                  handleSetSearchParam({
                                    ...newsAlertSearchParams,
                                    keyword: '',
                                  })
                                }
                              />
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <NewsAlertsContent data={newsAlertsData.newsAlertDataList} />
                        <div className="mb-contents-layout__footer">
                          <div className="search-result__footer">
                            <MbPagination
                              totalCount={newsAlertsData.pageCount.totalCount}
                              currentPageIndex={newsAlertSearchParams.page}
                              viewCount={newsAlertSearchParams.size}
                              totalPageCount={newsAlertsData.pageCount.totalPageCount}
                              onSelectSize={size_num => handleChangeSize(size_num, newsAlertSearchParams)}
                              onPaginationChange={page_num => handleChangePage(page_num, newsAlertSearchParams)}
                              isPageLoadCompleted={true}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateNewsAlertsPopup />
      <NewsAlertsDeletePopup />
    </Fragment>
  )
}

export default NewsAlerts
