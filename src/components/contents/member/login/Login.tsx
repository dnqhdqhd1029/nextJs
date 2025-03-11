import { useEffect, useLayoutEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import MediaBeeSymbol from '~/components/common/ui/MediaBeeSymbol'
import { DEMO_DOMAINS, RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { openToast } from '~/utils/common/toast'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'
import { useLogin } from '~/utils/hooks/contents/member/useLogin'

const Login = () => {
  const router = useRouter()
  const { licenseInfo } = useHeader()
  const {
    initDemo,
    stayLoggedIn,
    passwordErr,
    password,
    email,
    emailErr,
    setEmailAction,
    setPasswordAction,
    setStayLoggedInAction,
    nextStepValidate,
    setLogin,
  } = useLogin()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })
  const [isLoading, setIsLoading] = useState(false)

  const loginAction = async () => {
    setIsLoading(() => true)
    const res = await nextStepValidate(email, password)
    if (res) await setLogin(email, password, stayLoggedIn)
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
    console.log('router ==================================>>>>>>>>>>>>>>>>>> ', router)
  }, [])

  return (
    <>
      <div className="log-type1__section position-blank-center ">
        <div className="log-type1-header__section">
          <div className="log-type1-header__symbol">
            <MediaBeeSymbol />
          </div>
          <div className="log-type1-header__logo">
            <MediaBeeLogo />
          </div>
        </div>
        <h2 className="login-title log-type1-header__title ">언론인 로그인</h2>
        <div className="log-type1-contents__section">
          <ul>
            <li>
              <FormInputText
                id="user-email"
                name="user-email"
                title="이메일"
                onChange={e => setEmailAction(e.target.value)}
                failed={emailErr !== ''}
                msg={emailErr}
                value={email}
                onKeyDown={e => e.key === 'Enter' && isRecaptchaValidated()}
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
              <div className="log-type1-keep__section">
                <FormInputBtn
                  type="checkbox"
                  name="ck"
                  id="ck"
                  label="로그인 상태 유지"
                  checked={stayLoggedIn}
                  onChange={e => setStayLoggedInAction(e.target.checked)}
                />
                <Button
                  elem="button"
                  label={'비밀번호 찾기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-text'}
                  onClick={() => router.push('/login/password-find')}
                />
              </div>
            </li>
            {/* <li>
              <div className="form-msg__group">
                <p className="form-msg color-danger">이메일 또는 비밀번호가 일치하지 않습니다.</p>
              </div>
            </li> */}
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
            label={'로그인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={() => isRecaptchaValidated()}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>

      {!licenseInfo.isExpired && (
        <div className="flex-just-cen mt-20">
          아직 회원이 아니신가요?
          <Link href={'/join'}>
            <a
              style={{
                color: '#0094a8',
                marginLeft: '5px',
                marginBottom: '15px',
                display: 'inline-block',
              }}
            >
              프로필 등록하기
            </a>
          </Link>
        </div>
      )}
    </>
  )
}
export default Login
