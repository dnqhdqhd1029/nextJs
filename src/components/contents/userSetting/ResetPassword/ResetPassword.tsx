import { KeyboardEvent, useEffect, useLayoutEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { usePasswordSetting } from '~/utils/hooks/contents/member/usePasswordSetting'

const ResetPasswordUser = () => {
  const { getInputRef } = useValidate()
  const {
    passwordRef,
    passwordConfirmRef,
    reset,
    initDataAction,
    setResetPasswordConfirm,
    setResetPassword,
    resetPasswordFunction,
  } = usePasswordSetting()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })
  const [isLoading, setIsLoading] = useState(false)

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    setIsLoading(() => true)
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await resetPasswordFunction(reset)
    setIsLoading(() => false)
  }

  const checkV3Recaptcha = async () => {
    setIsLoading(() => true)
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : await resetPasswordFunction(reset)
    setIsLoading(() => false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') checkV3Recaptcha()
  }

  useLayoutEffect(() => {
    const badge = document.getElementsByClassName('grecaptcha-badge')[0]
    if (badge && badge instanceof HTMLElement) {
      badge.style.visibility = 'visible'
    }
    initDataAction()
  }, [])

  return (
    <div className="mb-container responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                <h2 className="common-title__title">비밀번호 재설정</h2>
              </div>
            </div>
          </div>

          {reset.type === 'months' && (
            <div className="mb-contents-pb28__group">
              <h3 className="font-body__regular">
                비밀번호 유효기간(6개월)이 지났습니다.
                <br />
                보안을 위해 새 비밀번호를 설정하세요.
              </h3>
            </div>
          )}

          <div className="w480">
            <ul>
              <li>
                <div className="ipt-text__area">
                  <FormTitle title="이메일" />
                  <p className="ipt-text-readonly">{reset.email}</p>
                </div>
              </li>
              <li style={{ marginTop: 18 }}>
                <FormInputText
                  id="user-passwd"
                  name="user-passwd"
                  title="새로운 비밀번호"
                  inputType="password"
                  getInputRef={ref => getInputRef(ref, passwordRef)}
                  value={reset.password}
                  onChange={e => setResetPassword(e.target.value, reset)}
                  failed={reset.passwordErr !== ''}
                  msg={reset.passwordErr}
                />
              </li>
              <li style={{ marginTop: 18 }}>
                <FormInputText
                  id="user-passwd-confirm"
                  name="user-passwd-confirm"
                  title="새로운 비밀번호 확인"
                  inputType="password"
                  getInputRef={ref => getInputRef(ref, passwordConfirmRef)}
                  value={reset.passwordConfirm}
                  onChange={e => setResetPasswordConfirm(e.target.value, reset)}
                  onKeyDown={i => handleKeyDown(i)}
                  failed={reset.passwordConfirmErr !== ''}
                  msg={reset.passwordConfirmErr}
                />
              </li>
            </ul>
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
            <div className="mb-contents-pt14__group">
              <Button
                label={'확인'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                isLoading={isLoading}
                disabled={isLoading}
                onClick={() => checkV3Recaptcha()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordUser
