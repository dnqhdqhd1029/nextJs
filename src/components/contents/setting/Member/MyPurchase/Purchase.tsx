import { Fragment, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import SortFilterList from '~/components/common/ui/SortFilterList'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { DefaultSettingLinks, myPurchaseSortOptionsByData } from '~/components/contents/setting/Member/defaultData'
import LicenseInformationPopup from '~/components/contents/setting/Member/MyPurchase/Popup/LicenseInformationPopup'
import PaymentInformationPopup from '~/components/contents/setting/Member/MyPurchase/Popup/PaymentInformationPopup'
import PurchaseList from '~/components/contents/setting/Member/MyPurchase/PurchaseList'
import { SelectListOptionItem } from '~/types/common'
import { useMyPurchase } from '~/utils/hooks/contents/setting/useMyPurchase'

const SettingMemberPurchase = () => {
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
    listKeywordParamsChange,
    init,
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
    init()
  }, [])

  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'회원'}
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
                        <h2 className="common-title__title">구매 내역</h2>
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
                    <ul className="interval-mt42">
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
                          <PurchaseList />
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
      <PaymentInformationPopup />
    </Fragment>
  )
}
export default SettingMemberPurchase
