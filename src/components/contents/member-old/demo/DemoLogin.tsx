import { ChangeEvent, KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useLogin } from '~/utils/hooks/contents/member/useLogin'

const DemoLogin = () => {
  const router = useRouter()
  const {
    userId,
    timeOut,
    stayLoggedIn,
    passwordErr,
    password,
    email,
    emailErr,
    passwordCheckErr,
    passwordCheck,
    setPasswordAction,
    setPasswordCheckAction,
    demoNextStepValidate,
    setUserPasswordCheck,
  } = useLogin()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })
  const [isLoading, setIsLoading] = useState(false)

  const loginAction = async () => {
    setIsLoading(() => true)
    const res = await demoNextStepValidate(email, password, passwordCheck)
    if (res) await setUserPasswordCheck(userId, email, password, stayLoggedIn)
    setIsLoading(() => false)
  }

  const isRecaptchaValidated = async () => {
    const v3Result = await textRecaptchaV3()
    if (!v3Result) {
      setIsV3Failed(true)
    } else {
      await loginAction()
    }
  }

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await loginAction()
  }

  useEffect(() => {
    if (v2Token) checkV2Recaptcha(v2Token)
  }, [v2Token])

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
          <div className="log-type1-header__logo">
            <MediaBeeLogo />
          </div>
          <h2 className="log-type1-header__title">데모 체험 로그인</h2>
        </div>
        <div className="log-type1-contents__section">
          <ul>
            <li>
              <p className="font-body__regular">
                미디어비 데모 체험을 하려면 비밀번호를 설정하세요.
                <br />
                데모는 로그인 후 {Number(timeOut) > 30 ? Number(timeOut) / 6 + '시간' : '30분'} 동안 사용 가능합니다.
              </p>
            </li>
            <li className="mt-20">
              <FormInputText
                id="user-email"
                name="user-email"
                title="이메일"
                readonly={true}
                disabled={true}
                failed={emailErr !== ''}
                msg={emailErr}
                value={email}
              />
            </li>
            <li>
              <FormInputText
                id="user-passwd"
                name="user-passwd"
                title="비밀번호"
                inputType="password"
                onChange={e => setPasswordAction(e.target.value)}
                failed={passwordErr !== ''}
                msg={passwordErr}
                value={password}
                onKeyDown={e => e.key === 'Enter' && isRecaptchaValidated()}
              />
            </li>
            <li>
              <FormInputText
                id="user-passwd"
                name="user-passwd"
                title="비밀번호 확인"
                inputType="password"
                onChange={e => setPasswordCheckAction(e.target.value)}
                failed={passwordCheckErr !== ''}
                msg={passwordCheckErr}
                value={passwordCheck}
                onKeyDown={e => e.key === 'Enter' && isRecaptchaValidated()}
              />
            </li>
          </ul>
          {isV3Failed && (
            <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
              <ReCAPTCHA
                size="normal"
                sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
                onChange={token => setV2Token(token)}
              />
            </div>
          )}
        </div>
        <div className="log-type1-footer__section">
          <Button
            label={'비밀번호 설정'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={() => isRecaptchaValidated()}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="log-type1-footer__section">
          <p className="font-body__regular">
            비밀번호를 이미 설정했으면{' '}
            <a
              href={`/member/login`}
              className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'primary'}`)}
            >
              <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>로그인</span>
            </a>
            으로 이동하세요
          </p>
        </div>
      </div>
    </>
  )
}

export default DemoLogin
