/**
 * @file Apply.tsx
 * @description 구매 신청
 */
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import AgreeNotice from '~/components/contents/purchaseRequest/AgreeNotice/AgreeNotice'
import Applicant from '~/components/contents/purchaseRequest/Applicant/Applicant'
import CompanyInfo from '~/components/contents/purchaseRequest/CompanyInfo/CompanyInfo'
import Product from '~/components/contents/purchaseRequest/Product/Product'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { usePurchaseRequest } from '~/utils/hooks/contents/purchaseRequest/usePurchaseRequest'

const Apply = () => {
  const { agreeNoticeInfo, isActionButton, applicantInfo, productInfo, companyInfo, buyApplyRequest } =
    usePurchaseRequest()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) applyRequest()
  }

  const checkV3Recaptcha = async () => {
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : applyRequest()
  }

  const applyRequest = () => {
    const params = {
      applicantInfo,
      companyInfo,
      productInfo,
      agreeNoticeInfo,
    }
    buyApplyRequest(params)
  }

  return (
    <div className="mb-container responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                <h2 className="common-title__title">구매 신청</h2>
              </div>
            </div>
          </div>

          <ul className="interval-mt14">
            <Applicant />
            <CompanyInfo />
            <Product />
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
                label={'서비스 구매 신청'}
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

export default Apply
