/**
 * @file SentPasswordEmail.tsx
 * @description 비밀번호 재설정 이메일 보냄
 */

import { useLayoutEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import MediaBeeSymbol from '~/components/common/ui/MediaBeeSymbol'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { usePasswordSetting } from '~/utils/hooks/contents/member/usePasswordSetting'

const SentPasswordEmail = () => {
  // const { password, checkAction, resetPassword } = usePasswordSetting()
  // const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
  //   minScore: RECAPTCHA_MIN_SCORE,
  // })
  // const [isLoading, setIsLoading] = useState(false)
  // const checkV2Recaptcha = async (token: string | null) => {
  //   if (!token) return
  //   setIsLoading(() => true)
  //   const result = await testRecaptchaV2(token)
  //   setIsV3Failed(false)
  //   if (result) await resetPassword(password)
  //   setIsLoading(() => false)
  // }
  //
  // const checkV3Recaptcha = async () => {
  //   setIsLoading(() => true)
  //   const v3Result = await textRecaptchaV3()
  //   !v3Result ? setIsV3Failed(true) : await resetPassword(password)
  //   setIsLoading(() => false)
  // }
  //
  // useLayoutEffect(() => {
  //   const badge = document.getElementsByClassName('grecaptcha-badge')[0]
  //   if (badge && badge instanceof HTMLElement) {
  //     badge.style.visibility = 'visible'
  //   }
  //   checkAction()
  // }, [])

  return (
    <div className="log-type1__section position-blank-center">
      <div className="log-type1-header__section">
        <div className="log-type1-header__symbol">
          <MediaBeeSymbol />
        </div>
        <div className="log-type1-header__logo">
          <MediaBeeLogo />
        </div>
      </div>
      <div className="log-type1-contents__section">
        <div className="log-type1-contents__title">비밀번호 재설정 링크를 보냈습니다.</div>
        <div className="log-type1-contents__text">
          재설정 링크를 누르고 새 비밀번호를 설정할 수 있습니다.
          <br />
          이메일이 도착하지 않았으면, 스팸메일함을 열어보세요.
          <br />
          그래도 메일이 오지 않으면 미디어비 작업자에게 문의하세요.
        </div>
      </div>
      {/*{isV3Failed && (*/}
      {/*  <div className="display-flex justify-content__center align-items__center mt-8 mb-8">*/}
      {/*    <ReCAPTCHA*/}
      {/*      size="normal"*/}
      {/*      sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"*/}
      {/*      onChange={token => checkV2Recaptcha(token)}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className="log-type1-footer__section">
        <Button
          label={'재설정 이메일 다시 받기'}
          cate={'default'}
          size={'m'}
          color={'outline-secondary'}
          //isLoading={isLoading}
          // onClick={() => checkV3Recaptcha()}
        />
      </div>
      <div className="log-type1-footer__section ">
        <button
          type={'button'}
          className={'color-primary '}
        >
          문의하기
        </button>
      </div>
    </div>
  )
}

export default SentPasswordEmail
