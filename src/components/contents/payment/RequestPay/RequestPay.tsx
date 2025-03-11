/**
 * @file Payment.tsx
 * @description 결제 견적 페이지
 */
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import AgreeNotice from '~/components/contents/payment/AgreeNotice/AgreeNotice'
import Applicant from '~/components/contents/payment/Applicant/Applicant'
import CashReceipts from '~/components/contents/payment/CashReceipts/CashReceipts'
import PayInfomation from '~/components/contents/payment/PayInfomation/PayInfomation'
import TaxBill from '~/components/contents/payment/TaxBill/TaxBill'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const RequestPay = () => {
  const {
    paymentInfo,
    payMethodType,
    invoiceType,
    isActionButton,
    paymentsId,
    applicantInfo,
    requestInfo,
    taxBillInfo,
    cashReceiptsInfo,
    agreeNoticeInfo,
    totalAgreeNotice,
    payButtonAction,
  } = usePayments()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) actionPayButton()
  }

  const checkV3Recaptcha = async () => {
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : actionPayButton()
  }
  const actionPayButton = () => {
    const params = {
      paymentInfo,
      payMethodType,
      invoiceType,
      applicantInfo,
      requestInfo,
      taxBillInfo,
      cashReceiptsInfo,
      agreeNoticeInfo,
      totalAgreeNotice,
      paymentsId,
    }
    payButtonAction(params)
  }

  return (
    <div className="mb-container responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                <h2 className="common-title__title">결제하기</h2>
              </div>
            </div>
          </div>

          <ul className="interval-mt14">
            <PayInfomation />
            {payMethodType.id !== 'CREDIT_CARD' && <>{invoiceType.id !== 'CR' ? <TaxBill /> : <CashReceipts />}</>}
            <Applicant />
            <AgreeNotice />
          </ul>
          {isV3Failed && (
            <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
              <ReCAPTCHA
                size="normal"
                sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
                onChange={token => checkV2Recaptcha(token)}
              />
            </div>
          )}
          <div className="mb-contents-footer__section">
            <div className="buttons__group button-min-w120">
              <Button
                label={'구매하기'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                disabled={!isActionButton}
                onClick={() => checkV3Recaptcha()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestPay
