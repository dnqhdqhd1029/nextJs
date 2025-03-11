import { useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import AgreeNotice from '~/components/contents/demo/AgreeNotice/AgreeNotice'
import Applicant from '~/components/contents/demo/Applicant/Applicant'
import Company from '~/components/contents/demo/Company/Company'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'
import { useDemo } from '~/utils/hooks/contents/demo/useDemo'

const ApplyPage = () => {
  const { isActionButton, applicantInfo, companyInfo, agreeNoticeInfo, demoRequest, init } = useDemo()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await applyRequest()
  }

  const checkV3Recaptcha = async () => {
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : await applyRequest()
  }

  const applyRequest = async () => {
    const params = {
      applicantInfo,
      companyInfo,
      agreeNoticeInfo,
    }
    await demoRequest(params)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="mb-container responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="service__section">
            <div className="service-visual__section">
              <h2 className="service-visual__title">
                미디어비는 고객 맞춤형 데모를 제공합니다.
                <br />
                지금 무료로 데모를 신청하세요.
              </h2>
            </div>

            <div className="service-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">데모 신청</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <Applicant />
              <Company />
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
                  label={'데모 신청'}
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
    </div>
  )
}

export default ApplyPage
