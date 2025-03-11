/**
 * @file ResetPassword.tsx
 * @description 비밀번호 찾기
 */

import { useLayoutEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import MediaBeeSymbol from '~/components/common/ui/MediaBeeSymbol'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { usePasswordSetting } from '~/utils/hooks/contents/member/usePasswordSetting'

const ResetPassword = () => {
  const { password, isResetLoading, sendPasswordEmail, setRePasswordAction } = usePasswordSetting()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })
  const [isLoading, setIsLoading] = useState(false)
  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    setIsLoading(() => true)
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await sendPasswordEmail(password)
    setIsLoading(() => false)
  }

  const checkV3Recaptcha = async () => {
    setIsLoading(() => true)
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : await sendPasswordEmail(password)
    setIsLoading(() => false)
  }

  useLayoutEffect(() => {
    const badge = document.getElementsByClassName('grecaptcha-badge')[0]
    if (badge && badge instanceof HTMLElement) {
      badge.style.visibility = 'visible'
    }
  }, [])

  return (
    <>
      <div className="log-type1__section position-blank-center">
        <div className="log-type1-header__section">
          <div className="log-type1-header__symbol">
            <MediaBeeSymbol />
          </div>
          <div className="log-type1-header__logo">
            <MediaBeeLogo />
          </div>
        </div>
        <h2 className="login-title log-type1-header__title">비밀번호 찾기</h2>
        <div className="log-type1-contents__section">
          <ul className="interval-mt14">
            <li>
              <p className="font-body__regular">비밀번호를 재설정 하려면 이메일을 입력하세요.</p>
            </li>
            <li>
              <FormInputText
                title={'이메일'}
                required={true}
                onChange={e => setRePasswordAction(e.target.value)}
                failed={password.emailErr !== ''}
                msg={password.emailErr}
                value={password.email}
              />
            </li>
          </ul>
        </div>
        {isV3Failed && (
          <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
            <ReCAPTCHA
              size="normal"
              sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
              onChange={token => checkV2Recaptcha(token)}
            />
          </div>
        )}
        <div className="log-type1-footer__section">
          <Button
            label={'비밀번호 재설정'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            onClick={() => checkV3Recaptcha()}
          />
        </div>
      </div>
    </>
  )
}

export default ResetPassword
