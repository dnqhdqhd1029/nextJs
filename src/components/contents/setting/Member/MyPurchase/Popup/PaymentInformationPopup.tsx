import { Fragment } from 'react'
import moment from 'moment'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { DefaultPaymentPopup } from '~/components/contents/setting/Member/defaultData'
import Flag from '~/publishing/components/common/ui/Flag'
import { getDateFormat } from '~/utils/common/date'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMyPurchase } from '~/utils/hooks/contents/setting/useMyPurchase'

const PaymentInformationPopup = () => {
  const { paymentPopup, timeZone, setPaymentPopupAction } = useMyPurchase()

  return (
    <Popup
      isOpen={paymentPopup.isOpen}
      title={`구매 상품`}
      onClose={() => setPaymentPopupAction(DefaultPaymentPopup)}
      width={'50vw'}
      hasCloseButton
      showFooter={false}
    >
      <div className="setting-contents__section">
        <dl className="dl-table-type1__section">
          <dt>
            <p className="dl-table-type1__text">상품</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{paymentPopup.productNameList?.toString() || ''}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">사용권</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{paymentPopup.licenseName?.toString() || ''}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">신청자</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{paymentPopup.customerName?.toString() || ''}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">결제자</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {paymentPopup.payerName?.toString() || ''} (
              <Button
                elem="a"
                url={`mailto:${paymentPopup.payerEmail?.toString() || ''}`}
                label={paymentPopup.payerEmail?.toString() || ''}
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
              {paymentPopup.payMethod?.toString() === 'CREDIT_CARD' ? '카드결제' : '통장입금'}
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">결제상태</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {/*{paymentPopup.payMethod?.toString() === 'CREDIT_CARD' ? '카드결제' : '통장입금'}*/}
              결제 완료 (또는 미결제)
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">결제금액</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{getCurrencyFormat(paymentPopup.depositedAmount?.toString())}원</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">견적금액</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{getCurrencyFormat(paymentPopup.estimatedAmount?.toString())}원</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">결제일</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{getDateFormat(timeZone, paymentPopup?.depositedAt || '')}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">증빙신청</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{paymentPopup.invoiceType}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">증빙발급</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {paymentPopup.isIssueInvoice === null ? '-' : paymentPopup.isIssueInvoice ? '발급' : '미발급'}
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">등록자</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{paymentPopup.reigsName || ''}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">등록일</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{getDateFormat(timeZone, paymentPopup?.regisAt || '')}</p>
          </dd>
        </dl>
      </div>
    </Popup>
  )
}
export default PaymentInformationPopup
