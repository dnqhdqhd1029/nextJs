/**
 * @file LoginBlocked.tsx
 * @description 로그인 차단
 */

import { useLayoutEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import MediaBeeSymbol from '~/components/common/ui/MediaBeeSymbol'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'

const LoginBlocked = () => {
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    setIsLoading(() => true)
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) {
      router.push('/member/user-certification')
    }
    setIsLoading(() => false)
  }

  const checkV3Recaptcha = async () => {
    setIsLoading(() => true)
    const v3Result = await textRecaptchaV3()
    if (v3Result) {
      router.push('/member/user-certification')
    } else {
      setIsV3Failed(true)
    }
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
          <h2 className="log-type1-header__title">로그인이 차단되었습니다.</h2>
        </div>
        <div className="log-type1-contents__section">
          <ul className="interval-mt14">
            <li>
              <p className="font-body__regular">
                5회 이상 로그인 연속 실패해 정보 보호를 위해 로그인을 차단했습니다. 아래 버튼을 눌러 인증 코드를 받아
                입력하세요.
              </p>
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
            label={'이메일로 인증 코드 받기'}
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

export default LoginBlocked
