/**
 * @file DemoSignIn.tsx
 * @description 로그인
 */

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { LoginDto } from '~/types/api/service'
import { TimeoutRef } from '~/types/common'
import { useSignIn } from '~/utils/api/auth/useSignIn'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'
import { useValidate } from '~/utils/hooks/common/useValidate'

const DemoSignIn = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const timerRef: TimeoutRef = useRef(null)
  const [isWorking, setIsWorking] = useState(false)
  const { getInputRef } = useValidate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  const signIn = useSignIn({
    onSuccess: response => {},
    onError: error => {
      setIsWorking(false)
    },
  })

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (value !== '') {
      setEmailErrorMessage('')
    }
    setEmail(value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (value !== '') {
      setPasswordErrorMessage('')
    }
    setPasswd(value)
  }

  const excuteLoginProcess = () => {
    const signInData: LoginDto = {
      email,
      passwd,
    }

    signIn.mutate(signInData)
  }

  const isValidated = () => {
    if (email === '') {
      setEmailErrorMessage('아이디를 입력해주세요.')
      setTimeout(() => {
        if (emailRef.current) emailRef.current.focus()
      }, 10)
      return
    }

    if (passwd === '') {
      setPasswordErrorMessage('비밀번호를 입력해주세요.')
      setTimeout(() => {
        if (passwordRef.current) passwordRef.current.focus()
      }, 10)
      return
    }

    return true
  }

  const isRecaptchaValidated = async () => {
    const v3Result = await textRecaptchaV3()

    if (!v3Result) {
      console.log('>> v3Failed', v3Result)
      setIsV3Failed(true)
    } else {
      excuteLoginProcess()
    }
  }

  const handleSubmit = () => {
    if (isWorking) return

    setIsWorking(true)

    if (!isValidated()) {
      setIsWorking(false)
      return
    }

    isRecaptchaValidated()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) {
      return
    }

    const result = await testRecaptchaV2(token)

    console.log('>> checkV2Recaptcha result', result)

    setIsV3Failed(false)

    if (result) {
      excuteLoginProcess()
    }
  }

  useEffect(() => {
    if (v2Token) {
      checkV2Recaptcha(v2Token)
    }

    //dispatch(resetState())
  }, [v2Token])

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {}, 100)
  }, [router])

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
                데모는 로그인 후 1시간 동안 사용 가능합니다.
              </p>
            </li>
            <li className="mt-20">
              <FormInputText
                id="user-email"
                name="user-email"
                title="이메일"
                value={email}
                getInputRef={ref => getInputRef(ref, emailRef)}
                onChange={handleChangeEmail}
                onKeyDown={handleKeyDown}
                failed={emailErrorMessage !== ''}
                msg={emailErrorMessage}
                readonly={true}
              />
            </li>
            <li>
              <FormInputText
                id="user-passwd"
                name="user-passwd"
                title="hkhkj"
                inputType="password"
                getInputRef={ref => getInputRef(ref, passwordRef)}
                value={passwd}
                onChange={handleChangePassword}
                onKeyDown={handleKeyDown}
                failed={passwordErrorMessage !== ''}
                msg={passwordErrorMessage}
              />
            </li>
            <li className="mt-20">
              <FormInputText
                id="user-passwd"
                name="user-passwd"
                title="비밀번호 확인"
                inputType="password"
                getInputRef={ref => getInputRef(ref, passwordRef)}
                value={passwd}
                onChange={handleChangePassword}
                onKeyDown={handleKeyDown}
                failed={passwordErrorMessage !== ''}
                msg={passwordErrorMessage}
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
            label={'로그인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={handleSubmit}
            disabled={isWorking}
            isLoading={isWorking}
          />
        </div>
      </div>
    </>
  )
}

export default DemoSignIn
