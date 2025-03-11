/**
 * @file MyLicenseDetail
 * @description 설정 - 사용권 - 내구매 상세
 */

import cn from 'classnames'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import MyPurchaseDetailPopup from '~/components/contents/setting/MyPurchaseDetail/Popup/MyPurchaseDetailPopup'
import NavigationBar from '~/components/contents/setting/NavigationBar/NavigationBar'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { getDateFormat } from '~/utils/common/date'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMyPurchase } from '~/utils/hooks/contents/setting/useMyPurchase'

const MyPurchaseDetail = () => {
  const router = useRouter()
  const { invoiceType, timeZone, payRequestDetail, setIsMyLicensePopupOpen } = useMyPurchase()

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className={cn('setting__contents')}>
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <div className="common-title__path">
                          <Button
                            label={'arrowLeft'}
                            cate={'ico-only'}
                            size={'s'}
                            color={'body-text'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.arrowLeft}
                            icoSize={24}
                            onClick={() => router.back()}
                          />
                        </div>
                        <h2 className="common-title__title">내 구매</h2>
                      </div>
                    </div>
                  </div>
                  {payRequestDetail.length > 0 && (
                    <div className="setting-contents__section">
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">상품</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {payRequestDetail[0].productNameList?.toString() || ''}
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">사용권</p>
                        </dt>
                        <dd>
                          <Button
                            label={payRequestDetail[0].licenseName?.toString() || ''}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                            onClick={() => setIsMyLicensePopupOpen(true)}
                          />
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">신청자</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">{payRequestDetail[0].customerName?.toString() || ''}</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">결제자</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {payRequestDetail[0].payerName?.toString() || ''} (
                            <Button
                              elem="a"
                              url={`mailto:${payRequestDetail[0].payerEmail?.toString() || ''}`}
                              label={payRequestDetail[0].payerEmail?.toString() || ''}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                            )
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">결제방법</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {payRequestDetail[0].payMethod?.toString() === 'CREDIT_CARD' ? '카드결제' : '통장입금'}
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">결제상태</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {/*{payRequestDetail[0].payMethod?.toString() === 'CREDIT_CARD' ? '카드결제' : '통장입금'}*/}
                            결제 완료 (또는 미결제)
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">결제금액</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getCurrencyFormat(payRequestDetail[0].depositedAmount?.toString())}원
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">견적금액</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getCurrencyFormat(payRequestDetail[0].estimatedAmount?.toString())}원
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">결제일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getDateFormat(timeZone, payRequestDetail[0]?.depositedAt || '')}
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">증빙신청</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">{invoiceType}</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">증빙발급</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {payRequestDetail[0].isIssueInvoice === null
                              ? '-'
                              : payRequestDetail[0].isIssueInvoice
                              ? '발급'
                              : '미발급'}
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">등록자</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">{payRequestDetail[0].reigsName || ''}</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">등록일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getDateFormat(timeZone, payRequestDetail[0]?.regisAt || '')}
                          </p>
                        </dd>
                      </dl>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyPurchaseDetailPopup />
    </>
  )
}

export default MyPurchaseDetail
