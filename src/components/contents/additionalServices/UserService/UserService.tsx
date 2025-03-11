/**
 * @file UserService.tsx
 * @description 부가 서비스 - 사용자
 */
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useAdditionalServices } from '~/utils/hooks/contents/additionalServices/useAdditionalServices'

const UserService = () => {
  const { selectedValue, popupTypes, openRequestPopup } = useAdditionalServices()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await openRequestPopup(popupTypes)
  }

  const checkV3Recaptcha = async () => {
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : await openRequestPopup(popupTypes)
  }

  return (
    <>
      {selectedValue.id === '13' && (
        <>
          <li>
            <div className="service-addition__text">
              <span className="type-bold">서비스 사용자 수를 추가하려면 별도의 상담이 필요합니다.</span>
            </div>
            <div className="service-addition__text">
              <span>더 많은 회원의 서비스 이용이 필요하면 견적을 요청하세요. 견적 후 카드 결제도 가능합니다.</span>
            </div>
          </li>
          {isV3Failed && (
            <li>
              <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
                <ReCAPTCHA
                  size="normal"
                  sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
                  onChange={token => checkV2Recaptcha(token)}
                />
              </div>
            </li>
          )}
          <li>
            <div className="mb-contents-footer__section">
              <div className="buttons__group button-min-w120">
                <Button
                  label={'견적요청'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  onClick={() => checkV3Recaptcha()}
                />
              </div>
            </div>
          </li>
        </>
      )}
    </>
  )
}

export default UserService
