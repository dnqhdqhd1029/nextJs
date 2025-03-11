/**
 * @file MyLicense
 * @description 설정 - 사용권 - 내구매
 */

import { useEffect, useLayoutEffect, useRef } from 'react'
import cn from 'classnames'
import moment from 'moment'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import SortFilterList from '~/components/common/ui/SortFilterList'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import { myPurchaseSortOptionsByData } from '~/components/contents/setting/MyPurchase/defaultData'
import MyPurchaseTable from '~/components/contents/setting/MyPurchase/MyPurchaseTable'
import NavigationBar from '~/components/contents/setting/NavigationBar/NavigationBar'
import { SelectListOptionItem } from '~/types/common'
import { useMyPurchase } from '~/utils/hooks/contents/setting/useMyPurchase'

const MyPurchase = () => {
  const router = useRouter()
  const {
    isDemoLicense,
    isLoading,
    payRequestSearchParams,
    listKeywordParams,
    pageCount,
    handlePaginationChange,
    handleChangeSort,
    handleChangeSize,
    initMerchantIdAction,
    listKeywordParamsChange,
    licenseInfo,
    handleChange,
  } = useMyPurchase()
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchReset = () => {
    listKeywordParamsChange('')
    handleChange('', payRequestSearchParams)
  }

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [isLoading])

  useEffect(() => {
    initMerchantIdAction()
  }, [])

  return (
    <div className="mb-container">
      <div className="mb-common-inner setting">
        <div className="mb-lnb__section type-w2">
          <NavigationBar />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div
              className="mb-contents-layout__contents"
              ref={scrollRef}
            >
              <div className={cn('setting__contents')}>
                <div className="setting__header">
                  <div className="common-title__section">
                    <div className="common-title__group">
                      <h2 className="common-title__title">내 구매</h2>
                      <div className="common-title__buttons">
                        <Button
                          label={'서비스 구매'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                          onClick={() =>
                            isDemoLicense
                              ? window.location.replace('https://www.naver.com/')
                              : router.push('/payment/purchase-request')
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <ul className="interval-mt16">
                    <li>
                      <div className="setting-contents-list__header">
                        <p className="font-body__regular">
                          내가 구매한 사용권 및 부가서비스 구매 내역을 확인할 수 있습니다.
                        </p>
                        <ul className="control-list">
                          <li>
                            <SortFilterList
                              sortOptionsByData={myPurchaseSortOptionsByData}
                              onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                                handleChangeSort([`${dataItem.id}!${orderItem.id}`], payRequestSearchParams)
                              }
                              value={payRequestSearchParams.sort}
                              disabled={pageCount.totalCount === undefined || pageCount.totalCount === 0}
                            />
                          </li>
                          <li className="search">
                            <FormInputSearch
                              placeholder={'검색'}
                              value={listKeywordParams}
                              onChange={e => listKeywordParamsChange(e.target.value)}
                              onKeyDown={e =>
                                e.key === 'Enter' && handleChange(listKeywordParams, payRequestSearchParams)
                              }
                              onDeleteButtonClick={() => searchReset()}
                            />
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="setting-contents-list__section type-table">
                        <MyPurchaseTable />
                        <div className="setting-contents-list__footer">
                          <MbPagination
                            totalCount={pageCount.totalCount}
                            currentPageIndex={payRequestSearchParams.page}
                            viewCount={payRequestSearchParams.size}
                            totalPageCount={pageCount.totalPageCount}
                            onSelectSize={(e: number) => handleChangeSize(e, payRequestSearchParams)}
                            onPaginationChange={(e: number) => handlePaginationChange(e, payRequestSearchParams)}
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
  )
}

export default MyPurchase
